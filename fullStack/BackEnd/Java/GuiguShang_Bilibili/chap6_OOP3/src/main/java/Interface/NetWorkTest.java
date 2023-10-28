package Interface;

/**
 * P353
 * 接口的应用: 代理模式
 *
 * @author xueshuo
 * @create 2023-01-28 6:46 pm
 */
public class NetWorkTest {
    public static void main(String[] args) {
        Server server = new Server();
        ProxyServer proxyServer = new ProxyServer(server);

        proxyServer.browse();
    }

}

interface NetWork{
    public void browse();
}

// 被代理类
class Server implements NetWork{
    @Override
    public void browse() {
        System.out.println("real server access network");
    }
}

// 代理类: 被代理类会被作为成员变量
class ProxyServer implements NetWork{
    private NetWork work;       // 并不是接口NetWork的实例, 而是实现了NetWork的类的实例
    public ProxyServer(NetWork work){
        this.work = work;
    }

    public void check(){
        System.out.println("proxy server checks before connect to network");
    }
    @Override
    public void browse() {
        check();

        work.browse();
    }
}



