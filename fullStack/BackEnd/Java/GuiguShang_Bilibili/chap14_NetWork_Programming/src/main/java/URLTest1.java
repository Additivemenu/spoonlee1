import java.net.MalformedURLException;
import java.net.URL;

/**
 * URL 网络编程
 * 1. URL(Uniform Resource Locator): 对应网络上某资源地址
 * 2. URL格式:
 *      <传输协议>://<主机名>:<端口号>/<文件名>#片段名?参数列表
 *      http://192.168.1.100:8080/helloworld/index.jsp#a?username=shkstart&password=123
 *
 *
 *
 * @author xueshuo
 * @create 2023-01-19 5:24 pm
 */
public class URLTest1 {

    public static void main(String[] args) {
        try {
            URL url = new URL("https://www.bilibili.com/video/BV1Kb411W75N?p=629&vd_source=c6866d088ad067762877e4b6b23ab9df");

            //public String getProtocol( )  获取该URL的协议名
            System.out.println(url.getProtocol());
            // public String getHost( )
            System.out.println(url.getHost());
            // public String getPort( )
            System.out.println(url.getPort());
            // public String getPath( )
            System.out.println(url.getPath());
            // public String getFile( )
            System.out.println("File: " + url.getFile());
            // public String getQuery() 获取该URL的查询名
            System.out.println("query: "+ url.getQuery());

        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

}
