import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * 1. 网络编程两个要素:
 *  --- IP, port
 *  --- communication protocols: TCP/IP model
 *
 * 2. IP & port
 *   1. IP: 唯一标识Internet上的计算机
 *   2. 在Java中使用InetAddress class代表IP
 *   3. IP分类: IPv4 vs. Ipv6; 万维网 vs. 局域网
 *   4. domain name: www.google.com
 *   5. 本地回路地址: 127.0.0.1 对应localhost
 *
 *  实例化InetAddress: getByName(String host), getLocalHost()
 *         InetAddress对象的两个常用方法: getHostName() / getHostAddress()
 *
 *
 *
 *
 *
 * @author xueshuo
 * @create 2023-01-10 6:29 pm
 */
public class InetAddressTest {

    public static void main(String[] args) {

        try {
            // File file = new File("hello.txt");  // InetAddress对象 就像 File对象一样, 代表计算机上的一个实体信息.
            InetAddress inet1 = InetAddress.getByName("192.168.10.14");
            System.out.println(inet1);

            InetAddress inet2 = InetAddress.getByName("www.atguigu.com");
            System.out.println(inet2);

            InetAddress inet3 = InetAddress.getByName("localhost");
            System.out.println(inet3);

            // get localhost ip address
            InetAddress inet4 = InetAddress.getLocalHost();
            System.out.println(inet4);

            // getHostName()
            System.out.println(inet2.getHostName());
            // getHostAddress()
            System.out.println(inet2.getHostAddress());


        } catch (UnknownHostException e) {
            e.printStackTrace();
        }


    }

}
