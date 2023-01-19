import org.junit.Test;

import java.io.*;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * 实现TCP网络链接
 * e.g.2: 623
 *      客户端发送文件给服务端, 服务端将文件保存在本地
 *      F35.jpg ---> F35-copy.jpg
 *
 * @author xueshuo
 * @create 2023-01-19 1:40 pm
 */
public class TCPTest2 {

    @Test
    public void client() {
        Socket socket = null;
        OutputStream os = null;     // 从内存向socket输出数据
        FileInputStream fis = null; // 读取file进入内存
        try {
            // step1: socket instance
            socket = new Socket(InetAddress.getByName("127.0.0.1"), 9090);
            // step2: 读写
            os = socket.getOutputStream();

            fis = new FileInputStream(new File("F35.jpg"));
            // 边读边写
            byte[] buffer = new byte[1024];
            int len;
            while((len = fis.read(buffer)) != -1){
                os.write(buffer, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // step3: close
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (socket != null) {
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }



    }


    @Test
    public void server() {
        ServerSocket ss = null;
        Socket socket = null;
        InputStream is = null;           // read客户端的input
        FileOutputStream fos = null; // write到file里
        try {
            // step1: ServerSocket
            ss = new ServerSocket(9090);
            // step2: get socket
            socket = ss.accept();
            // step3: 读写
            is = socket.getInputStream();

            fos = new FileOutputStream(new File("F35-copy.jpg"));
            // 边读边写
            byte[] buffer = new byte[1024];
            int len;
            while((len = is.read(buffer)) != -1 ){
                fos.write(buffer, 0, len);
            }
            System.out.println("File transmission success!");

        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            // step4: close
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (socket != null) {
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (ss != null) {
                try {
                    ss.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }
}
