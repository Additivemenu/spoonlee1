package class05_dynamicProxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * 19年视频教程 662: 动态代理举例
 *
 * 要实现动态代理, 要解决的问题
 * 问题一: 如何根据加载到内存中的被代理类, 动态地创建一个代理类及其对象
 * 问题二: 当通过代理类的对象调用方法时, 如何动态地去调用被代理类中的同命方法?
 *
 * @author xueshuo
 * @create 2023-02-23 10:19 am
 */
public class DynamicProxyTest {

    // 最终实现的效果就是, 只需要给我被代理类的对象, 我就可以动态地生成一个代理类的对象, 允许你通过代理类去调用被代理类的同命方法
    public static void main(String[] args) {
        // 创建被代理类对象
        SuperMan superMan = new SuperMan();
        // proxyInstance: 动态地生成代理类的对象
        Human proxyInstance = (Human) ProxyFactory.getProxyInstance(superMan);
        // 当通过代理类对象调用方法时, 会自动地去调用被代理类中的同名方法
        System.out.println(proxyInstance.getBelief());         //  其实是回去调用handler里的invoke()方法
        proxyInstance.eat("四川麻辣烫");


        System.out.println("e.g. 2 *****************************");
        // 创建被代理类对象
        NikeClothFactory nikeClothFactory = new NikeClothFactory();
        // 动态的创建代理类
        ClothFactory proxyClothFactory = (ClothFactory) ProxyFactory.getProxyInstance(nikeClothFactory);
        // 通过代理类来调用被代理类中的同名方法
        proxyClothFactory.produceCloth();
    }

}


interface Human{
    String getBelief();
    void eat(String food);
}

// 被代理类 ------------------------------------------------------
class SuperMan implements Human{
    @Override
    public String getBelief() {
        return  "I believe I can fly!";
    }

    @Override
    public void eat(String food) {
        System.out.println("I like eating " + food);
    }
}

// AOP 示例
class HumanUtil {
    public void method1(){
        System.out.println("================== 通用方法一 ==================");
    }

    public void method2(){
        System.out.println("================== 通用方法二 ==================");
    }
}


// Proxy -------------------------------------------------------
class ProxyFactory{
    // 调用此方法, 返回一个代理类的对象,
    // 注意方法的argument的类型指被代理类的类型, 返回值类型指代理类的类型, 因为我们要实现动态代理所以他们都只写Object
    public static Object getProxyInstance(Object obj){      // obj: 被代理类的对象
        MyInvocationHandler handler = new MyInvocationHandler();

        handler.bind(obj);

        // 该方法的前两个参数 解决问题一: 如何根据加载到内存中的被代理类, 动态地创建一个代理类及其对象 (利用反射去读取被代理类的ClassLoader, 以及Class实例)
        // 第三个参数解决问题二: 当通过代理类的对象调用方法时, 如何动态地去调用被代理类中的同命方法?
        return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), handler);

    }
}

class MyInvocationHandler implements InvocationHandler{
    private Object obj; // 被代理类对象, 赋值时使用被代理类对象

    public void bind(Object obj){       // 依赖注入
        this.obj = obj;
    }

    // 当我们通过代理类的对象调用方法a时， 就会自动地调用如下的方法: invoke()
    // 将被代理类要执行的方法a的功能就声明在invoke()方法中
    // arg1: proxy即我们的代理类对象, arg2: method即代理类对象想要调用的方法对象的实例, arg3: args即同名方法的参数
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        HumanUtil util = new HumanUtil();
        util.method1();     // AOP:  代表固定的代码块

        // AOP: 代表可变的代码块------------------------------------------------------
        // 即为代理类对象调用的方法, 此方法也就作为了被代理类对象要调用的方法
        // 参数中的obj 即为被代理类的对象
        Object returnValue = method.invoke(obj, args);   // 利用反射： 方法(对象)调用对象
        // returnValue即作为当前类中invoke()的返回值
        // ----------------------------------------------------------

        util.method2();     // AOP:  代表固定的代码块

        return returnValue;
    }
}