package IO_Stream;

import org.junit.Test;

import java.io.*;

/**
 * 处理流之二
 * 1. test 转换流
 *  InputStreamReader (本身属于char stream): 将一个字节的输入流转换为字符的输入流, 用于解码
 *  OutputStreamReader (本事属于char stream): 将一个字符的输出流转换为字节的输出流, 用于编码
 * 2. 作用: 提供char stream 与 byte stream之间的转换
 *
 * 3. 解码(看不懂 -> 看得懂): 字节, 字节数组 --> 字符数组, 字符串
 *    编码(看得懂 -> 看不懂): 解码的逆过程
 *
 * 4. 字符集
 *
 */
public class InputStreamReaderTest {

    /**
     * InputStreamReader: 实现字节流的输入转换为字符流的输入
     *
     */
    @Test
    public  void test1() {
        InputStreamReader isr1  = null;
        try {
            // 1,2
            FileInputStream fis = new FileInputStream("dbcp.txt");
            //InputStreamReader isr  = new InputStreamReader(fis);        // 使用系统默认字符集(charSet), IDEA默认是UTF-8
            // argument2 points out charSet, 具体用哪个字符集取决于文件保存的时候使用的字符集
            isr1 = new InputStreamReader(fis,"UTF-8");

            // 3
            char[] cbuf = new char[20];
            int len;
            while((len = isr1.read(cbuf)) != -1){
                String str = new String(cbuf, 0, len);
                System.out.print(str);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // 4
            if (isr1 != null) {
                try {
                    isr1.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    /**
     * InputStreamReader, OutputStreamWriter work together
     *
     */
    @Test
    public void test2()  {
        InputStreamReader isr = null;
        OutputStreamWriter osw = null;
        try {
            // 1.
            File file1 = new File("dbcp.txt");
            File file2 = new File("dbcp_gbk.txt");
            // 2.
            FileInputStream fis = new FileInputStream(file1);
            FileOutputStream fos = new FileOutputStream(file2);

            isr = new InputStreamReader(fis, "utf-8");
            osw = new OutputStreamWriter(fos, "gbk");

            // 3.
            char[] cbuf = new char[20];
            int len;
            while((len = isr.read(cbuf)) != -1){
                osw.write(cbuf, 0, len);
            }

            System.out.println("to gbk successfully");
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // 4. close
            if (osw != null) {
                try {
                    osw.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if (osw != null) {
                try {
                    isr.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
