import org.junit.Test;

import java.io.IOException;
import java.net.*;

/**
 * UDP网络编程
 *
 * 信息是以DatagramPacket为载体的
 *
 * @author xueshuo
 * @create 2023-01-19 4:16 pm
 */
public class UDPTest1 {

    /**
     * 发送端
     */
    @Test
    public void sender() throws IOException {
        // instantiate DatagramSocket
        DatagramSocket datagramSocket = new DatagramSocket();

        // 封装数据包(encoding): readable ---> btye[]
        String str = "UDP missle";
        byte[] data = str.getBytes();
        InetAddress inet = InetAddress.getLocalHost();

        DatagramPacket packet = new DatagramPacket(data, 0, data.length, inet, 9090);

        // send
        datagramSocket.send(packet);

        // close resource
        datagramSocket.close();

    }


    /**
     * 接收端
     *
     */
    @Test
    public void receiver() throws IOException {
        // instantiate DatagramSocket
        DatagramSocket socket = new DatagramSocket(9090);

        // 接收
        byte[] buffer = new byte[100];
        DatagramPacket packet = new DatagramPacket(buffer, 0, buffer.length);
        socket.receive(packet);

        // 解封数据包(decoding):  byte[] ---> Readable
        System.out.println(new String(packet.getData(), 0, packet.getLength()));

        // close resource
        socket.close();
    }
}
