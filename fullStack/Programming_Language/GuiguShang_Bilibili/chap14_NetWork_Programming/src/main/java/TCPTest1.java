import org.junit.Test;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * 实现TCP的网络编程
 * e.g.1: 622
 *      client side send a message to server side, server side show the message
 *          先跑server等待client的请求,  再跑client
 *
 *
 * @author xueshuo
 * @create 2023-01-19 12:24 pm
 */
public class TCPTest1 {

    /**
     *  客户端
     */
    @Test
    public void client() throws IOException {
        Socket socket = null;
        OutputStream os = null;
        try {
            // step1: 创建Socket对象, 指明服务器端的IP和port
            InetAddress inet = InetAddress.getByName("127.0.0.1");      // 服务器的IP
            socket = new Socket(inet, 8899);        // 建立与server的连接
            // step2: 获取输出流, 用于输出数据
            os = socket.getOutputStream();

            // step3: 输出数据
            os.write("hello, I am client ".getBytes());

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // step4: 关闭资源. remember to release resources, 还是try-catch-finally 三连保证即使出现Exception资源也可以被关闭
            if(os != null){
                try {
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(socket != null) {
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    /**
     * 服务端
     */
    @Test
    public void server() throws IOException {

        ServerSocket ss = null;
        Socket socket = null;
        InputStream is = null;
        ByteArrayOutputStream baos = null;
        try {
            // step1: 创建服务器端的ServerSocket, 指明自己的port (自己的IP在哪个主机上跑 就是哪个主机的IP)
            ss = new ServerSocket(8899);
            // step2: 调用accept（）表示接受来自客户端的socket
            socket = ss.accept();       // accept() returns a socket instance
            // step3: 获取输入流
            is = socket.getInputStream();

            // step4: 接收输入流中的数据
//        // 方式一: 不建议这么写, 可能有乱码: 中文字符有可能被劈成两半
//        byte[] buffer = new byte[1024];
//        int len;
//        while( (len = is.read(buffer)) != -1){
//            String str = new String(buffer, 0, len);
//            System.out.print(str);
//        }

            // 方式二:
            baos = new ByteArrayOutputStream();
            byte[] buffer = new byte[5];
            int len;
            while((len = is.read(buffer)) != -1){
                baos.write(buffer, 0, len);     // 读多少写多少
            }

            System.out.println(baos.toString());
            System.out.println("received data from: "+socket.getInetAddress().getHostAddress());

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // step4: 关闭资源

            if (baos != null) {
                try {
                    baos.close();
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

            if (ss !=null) {
                try {
                    ss.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }




    }


}
