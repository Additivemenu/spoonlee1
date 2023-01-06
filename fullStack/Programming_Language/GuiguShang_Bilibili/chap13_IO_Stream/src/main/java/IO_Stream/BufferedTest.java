package IO_Stream;

import org.testng.annotations.Test;

import java.io.*;

/**
 * 处理流之一: buffered stream
 * 1.buffered stream:
 *      char stream:
 *              BufferedReader
 *              BufferedWriter
 *      byte stream:
 *           BufferedInputStream
 *              BufferedOutputStream
 * 2. buffered stream的意义: 提升读写速度, 因为其内部提供了缓存区 DEFAULT_BUFFER_SIZE (see source code)
 * 3. 处理流就是"套接"在节点流的基础上的
 */
public class BufferedTest {

    /**
     *  copy non-text file
     */
    @Test
    public void BufferedStreamTest()  {
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        try {
            // 1
            File srcFile = new File("Dva.jpg");
            File destFile = new File("Dva2.jpg");
            // 2 instantiate stream
            // 2.1 节点流
            FileInputStream fis = new FileInputStream(srcFile);
            FileOutputStream fos = new FileOutputStream(destFile);
            // 2.2 处理流
            bis = new BufferedInputStream(fis);
            bos = new BufferedOutputStream(fos);

            // 3 read & write
            byte[] buffer = new byte[10];
            int len;
            while((len = bis.read(buffer)) != -1){
                bos.write(buffer, 0 , len);
            }
            System.out.println(""+srcFile+" copy succeed!");

        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {

            // 4 close
            // firsly close outer stream(处理流), then close inner stream(节点流)
            if (bos != null) {
                try {
                    bos.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if (bis != null) {
                try {
                    bis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            // actually, after we are closed outer stream, inner stream will also be closed automatically.
//          fos.close();
//          fis.close();
        }

    }

    /**
     * copy file
     *
     */
    public void copyFileWithBufferedStream(String srcPath, String destPath) {
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        try {
            // 1
            File srcFile = new File(srcPath);
            File destFile = new File(destPath);
            // 2 instantiate stream
            // 2.1 节点流
            FileInputStream fis = new FileInputStream(srcFile);
            FileOutputStream fos = new FileOutputStream(destFile);
            // 2.2 处理流
            bis = new BufferedInputStream(fis);
            bos = new BufferedOutputStream(fos);

            // 3 read & write
            byte[] buffer = new byte[1024];
            int len;
            while((len = bis.read(buffer)) != -1){
                bos.write(buffer, 0 , len);

            }
            System.out.println(""+srcFile+" copy succeed!");

        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {

            // 4 close
            // firsly close outer stream(处理流), then close inner stream(节点流)
            if (bos != null) {
                try {
                    bos.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if (bis != null) {
                try {
                    bis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            // actually, after we are closed outer stream, inner stream will also be closed automatically.
//          fos.close();
//          fis.close();
        }

    }

    @Test
    public  void testCopyFileWithBufferedStream(){
        long start = System.currentTimeMillis();

        String srcPath = "C:\\1_Java\\Beijing.MOV";
        String destPath = "C:\\1_Java\\Beijing_copy1.MOV";
        copyFileWithBufferedStream(srcPath, destPath);

        long end = System.currentTimeMillis();
        System.out.println("copy time is: "+ (end-start)+" ms");        // 293ms,  buffer的大小也会影响处理时间
    }


    /**
     * use BufferedReader, BufferedWriter to copy txt file
     *
     */
    @Test
    public void testBufferedReaderBufferedWriter()  {
        BufferedReader br = null;
        BufferedWriter bw = null;
        try {
            // step 1,2 合并写法
            br = new BufferedReader(new FileReader(new File("dbcp.txt")));
            bw = new BufferedWriter(new FileWriter(new File("dbcp_copy.txt")));

            // step 3
//            // 方式一 read
//            char[] cbuf = new char[1024];
//            int len;
//            while((len = br.read(cbuf)) != -1){
//                bw.write(cbuf,0, len);
//            }
            // 方式二: readLine
            String dataLine;
            while((dataLine = br.readLine()) != null){
//                // 方法一:
//                bw.write(dataLine + "\n");     // dataLine 本身中不包含换行符

                // 方法二:
                bw.write(dataLine);             // dataLine 本身中不包含换行符
                bw.newLine();                   // 换行
            }

            System.out.println("copy succeed!");

        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // step 4 close
            if (bw != null) {
                try {
                    bw.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }


    }

}
