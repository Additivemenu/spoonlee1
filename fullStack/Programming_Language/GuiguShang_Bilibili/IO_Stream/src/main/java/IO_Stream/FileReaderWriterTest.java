package IO_Stream;

import org.testng.annotations.Test;

import java.io.*;


/**
 * 流的分类:
 * 1.操作数据的最小单位: byte stream, char stream
 * 2.数据流向: Input Stream, Output Stream
 * 3. 流的角色: 节点流, 处理流
 *
 * stream的体系结构
 * 抽象基类                     节点流(文件流)                                                缓冲流(处理流大的一种) 自动flush
 * InputStream                 FileInputStream   (read(byte[] buffer))                     BufferedInputStream (read(btye[] buffer))
 * OutputStream                FileOutputStream  (write(byte[] buffer, 0, len))            BufferedOutputStream (write(btye[buffer, 0, len])) / flush()
 * Reader                      FileReader (read(char[] cbuf))                              BufferedReader (read(char[] cbuf)) / readLine()
 * Writer                      FileWriter (write(char[] cbuf, 0, len))                     BufferedWriter (write(char[] cbuf, 0, len)) / flush()
 */
public class FileReaderWriterTest {

    public static void main(String[] args){
        File file = new File("hello.txt");      // main function中相对路径相较于当前工程路径(C:\1_Java\GuiguShang_Bilibili)
        System.out.println(file.getAbsolutePath());

        File file1 = new File("IO_Stream\\hello.txt");
        System.out.println(file1.getAbsolutePath());
    }

    /**
     * load hello.txt into main memory and display the content
     * 1. read(): return 读入的一个char. 如果达到文件末尾, return -1
     * 2. Exception handling: 为了保证流资源一定可以执行close(), 需要使用try-catch-finally
     * 3. 读入的文件必须存在, 否则Step2 ` fr = new FileReader(file);`会throw FileNotFoundException
     *
     */
    @Test
    public void testFileReader() {
        FileReader fr = null;
        try {
            //  step1: instantiate File class, point out which file you want to manipulate over
            File file = new File("hello.txt");      // unit test中相对路径相较于当前Module(C:\1_Java\GuiguShang_Bilibili\IO_Stream)
            // step2: provide stream
            fr = new FileReader(file);      // TODO: might throw FileNotFoundException
            // step3: load data
            //          read(): return 读入的一个字符. 如果达到文件末尾, return -1
            int data = fr.read();           // char 也对应int值     TODO: might throw Exception
            while(data != -1){
                System.out.print((char)data);
                data = fr.read();           // 相当于i++, condition for next loop  TODO: might throw Exception
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // step4: close stream  千万别忘!  因为JVMl垃圾回收对于物理连接无能为力
            try {
                if(fr != null){     // TODO:in case fr is not instantiated when `fr = new FileReader(file)` throws exception
                    fr.close();
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

    }

    /**
     * 对read()操作升级: 使用read重载方法
     *      read(char[]):  loop over char in the file, write them into char[] every time
     *                      return the number of char read into cbuf; return -1 if reaching end of the file
     */
    @Test
    public void testFileReader1()  {
        FileReader fr = null;
        try {
            // 1. instantiate File class
            File file = new File("hello.txt");

            // 2. instantiate FileReader stream
            fr = new FileReader(file);

            // 3. read(char[]) 批量读取
            // read(char[] cbuf): return the number of char read into cbuf; return -1 if reaching end of the file

            char[] cbuf = new char[5];      // char[] buffer
            int len;
            while( (len=fr.read(cbuf)) != -1){          // 每读取5个char打印一次 TODO: fr.read(cbuf)每次把file中的char[5]写入cbuf中
                // 方式一 错误写法 !!!!!!
//                for(int i=0; i<cbuf.length; i++){       // for loop 是loop over all elements of char[5]
//                    System.out.print(cbuf[i]);
//                }
                // 方式二 正确写法
                for(int i=0; i<len; i++){       // cbuf取了几个char就打印几个
                   System.out.print(cbuf[i]);
                }

//                // 方式三 错误写法!!!! 错误原理和方式一相同
//                String str = new String(cbuf);      // String constructor: char[] -> String
//                System.out.println(str);
                // 方式四 正确写法, 对应方式二
                String str1 = new String(cbuf,0,len);
                System.out.print(str1);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if(fr != null){
                try {
                    // 4. close stream
                    fr.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

    }

    /**
     * export data from main memory into hard drive
     * Note:
     * 1. output stream, corresponding file in the hard drive is allowed to be not existed.
     *            If not existing, create the file automatically
     *            If existing, depending on the second argument of FileWriter constructor (append, false by default)
     *                                 append = true, append the file not overwrite
     *                                 append = false, overwrite the file
     *
     */
    @Test
    public void testFileWriter()  {
        FileWriter fw = null;
        try {
            // 1. instantiate file class
            File file = new File("hello1.txt");
            // 2. instantiate writer stream
            fw = new FileWriter(file);
            // 3. write
            fw.write("I have a dream!\n".toCharArray());
            fw.write("you need to have a dream!");
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // 4. close writer stream
            if(fw != null){
                try {
                    fw.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    /**
     *
     * copy a file
     * 注意:
     * 1. 当创建了一系列的I/O Stream, 最好按创建时的倒序来close它们
     */
    @Test
    public void testFileReaderFileWriter() {
        FileReader  fr = null;
        FileWriter fw = null;
        try {
            // 1. instantiate File class
            File srcFile = new File("hello.txt");
            File destFile = new File("helloCopy.txt");

            // 2. instantiate I/O stream
            fr = new FileReader(srcFile);
            fw = new FileWriter(destFile);

            // 3. read & write
            char[] cbuf = new char[5];
            int len;        // record the number of char read into cbuf
            while((len=fr.read(cbuf))!=-1){
                fw.write(cbuf, 0, len);     // export len char just read
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // 4. close stream      TODO: better close in the reverse order of creating streams
            try {
                if(fw != null)
                    fw.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            try {
                if(fr != null)
                    fr.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }


}
