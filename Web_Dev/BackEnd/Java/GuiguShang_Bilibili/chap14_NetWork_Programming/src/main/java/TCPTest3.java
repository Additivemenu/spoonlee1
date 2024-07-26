import org.junit.Test;

import java.io.*;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * TCP网络编程
 * e.g.3: 624
 *      从客户端发送文件给服务端, 服务端保存到本地, 并返回"发送成功"给客户端, 并关闭相应的连接
 *      涉及到阻塞式方法, 发送方应明确提示接收方发送完毕, 接收方可以停止listen并继续接下来的指令了
 *
 *
 * @author xueshuo
 * @create 2023-01-19 2:09 pm
 */
public class TCPTest3 {

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
            // 关闭数据的输出, 提示接收方:发送方数据发送完毕, 你可以结束listen了并继续跑后续的代码了
            socket.shutdownOutput();

            // 第二大步: 客户端接收来自服务器端的反馈, 并显示到terminal
            InputStream is = socket.getInputStream();       // 接收来自socket的input
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            byte[] buffer1 = new byte[20];
            int len1;
            while((len1 = is.read(buffer1)) != -1 ){
                baos.write(buffer1, 0, len1);
            }

            System.out.println(baos.toString());

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // step3: close
            // 记得关闭新加入的stream(), 这里不写了

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

            fos = new FileOutputStream(new File("F35-copy-test3.jpg"));
            // 边读边写
            byte[] buffer = new byte[1024];
            int len;
            while((len = is.read(buffer)) != -1 ){      // read() 阻塞式方法, 只有client(发送信息方)明确指示数据发送完了, server才会结束listen, 不然一直卡在这个for循环出不去
                fos.write(buffer, 0, len);
            }
            System.out.println("Server: file transmission complete!");

            // 第二大步: 服务器端给客户端的反馈
            OutputStream os = socket.getOutputStream();
            os.write("Hi, Client, I have received your pic".getBytes());


        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // step4: close
            // 记得关闭新加入的stream(), 这里不写了

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
