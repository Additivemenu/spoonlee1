package IO_Stream.processing_stream;

import org.junit.Test;

import java.io.*;

/**
 * 其他流的使用
 * 1. standard input/output stream
 * 2. print stream
 * 3. data stream
 */
public class OtherStreamTest {
    /**
     *
     * 1. standard input/output stream
     * 1.1
     * System.in: input by keyboard by default  (注意System.in是个byte stream)
     * System.out: output to terminal by default
     * 1.2 重定向
     * System class 的 setIn(InputStream in) / setOut(PrintStream out) 重新指定输入和输出的流
     *
     * 1.3 practice:
     * 从键盘输入字符串, 要求将读取到的整行字符串转成大写输出. 然后继续进行输入操作, 直到输入'e' or 'exit', 退出程序
     *  方法一: Scanner, 调用next()返回一个字符串
     *  方法二: System.in, System.in ---> 转换流 ---> BufferedReader的readLine()
     *  注意IDEA中unit test中无法在terminal type in
     */
    public static void main(String[] args)  {
        BufferedReader br = null;

        try {
            // 1,2
            InputStreamReader isr = new InputStreamReader(System.in);       // System.in is a byte stream, need to convert it to char stream firstly
            br = new BufferedReader(isr);

            // 3
            String data;
            while(true){
                System.out.println("please type in a string: ");
                data = br.readLine();
                if(data.equalsIgnoreCase("e")||data.equalsIgnoreCase("exit") ){
                    System.out.println("program exit");
                    break;
                }
                String upperCase = data.toUpperCase();
                System.out.println(upperCase);

            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // close
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

        }
    }

    /**
     * 打印流: PrintStream, PrintWriter
     *
     * 提供了一系列重载的print(), println()
     *
     */
    @Test
    public void test2()  {
        PrintStream ps = null;
        try {
            // step1 connection
            FileOutputStream fos = new FileOutputStream(new File("PrintStreamTxt.txt"));
            // 创建打印输出流, 设置为autoFlush mode (写入换行符或'\n'时都会刷新输出缓冲区)
            ps = new PrintStream(fos, true);
            if(ps != null){     // 把标准输出流(output at terminal)改成输出到file
                System.setOut(ps);
            }

            // step2 R&W
            for(int i=0; i<= 255; i++){     // 输出ASCII char
                System.out.print((char) i);
                if(i % 50 == 0){        // 每50个数据一行
                    System.out.println();
                }
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            // step3 close
            if (ps != null) {
                try {
                    ps.close();
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }

    }


    /**
     * 数据流: 为了方便地操作Java地primitive data 和 String 类型数据
     * 1. DataInputStream DataOutputStream
     *
     * 2. 作用: 用于读取或写出基本数据类型的变量或字符串
     *
     * Practice: 将内存中基本数据类型的变脸export to file
     */
    @Test
    public void test3() {
        DataOutputStream dos = null;
        try {
            // step1 connection
            dos = new DataOutputStream(new FileOutputStream("data.txt"));

            // step2 R&W
            dos.writeUTF("xueshuo li");
            dos.flush();            // flush, export existing data in memory to file
            dos.writeInt(24);
            dos.flush();
            dos.writeBoolean(true);
            dos.flush();

        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // step3 close
            if (dos != null) {
                try {
                    dos.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    /**
     * 读取file中保存的数据, 导入程序内存
     * 注意: 读取数据的顺序要和写入时保存数据的顺序一致
     *
     */
    @Test
    public void test4(){
        DataInputStream dis = null;
        try {
            // step1 connection
            dis = new DataInputStream(new FileInputStream("data.txt"));

            // step2 R&W
            String name = dis.readUTF();
            int age = dis.readInt();
            boolean isMale = dis.readBoolean();

            System.out.println("Name: "+ name +", age: "+ age+", isMale: "+ isMale);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // step3 close
            if (dis != null) {
                try {
                    dis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

    }

}
