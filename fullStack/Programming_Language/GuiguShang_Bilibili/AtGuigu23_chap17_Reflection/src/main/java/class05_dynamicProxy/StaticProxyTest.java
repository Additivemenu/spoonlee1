package class05_dynamicProxy;

/**
 * 19年教程, 660 静态代理举例
 * 特点: 代理类和被代理类写死了, 在编译时他们就被确定下来了
 *
 * @author xueshuo
 * @create 2023-02-23 10:08 am
 */
public class StaticProxyTest {

    public static void main(String[] args) {
        // 创建被代理类对象
        NikeClothFactory nikeClothFactory = new NikeClothFactory();
        // 创建代理类对象, 通过构造器依赖注入
        ProxyClothFactory proxyClothFactory = new ProxyClothFactory(nikeClothFactory);

        // 代理类对象执行
        proxyClothFactory.produceCloth();
    }
}


interface ClothFactory{
    void produceCloth();
}


// Proxy --------------------------------------------
class ProxyClothFactory implements ClothFactory{
    private ClothFactory factory;       // 用被代理类对象进行实例化 / 多态: 接口的实现类可以被实例化

    public ProxyClothFactory (ClothFactory factory){        // dependency injection
        this.factory = factory;
    }

    @Override
    public void produceCloth() {
        System.out.println("proxy factory do some preliminary work");
        factory.produceCloth();
        System.out.println("Proxy factory do some post work");
    }
}

// 被代理类 -------------------------------------------
class NikeClothFactory implements ClothFactory{
    @Override
    public void produceCloth(){
        System.out.println("Nike工厂生产一批运动服");
    }

}

