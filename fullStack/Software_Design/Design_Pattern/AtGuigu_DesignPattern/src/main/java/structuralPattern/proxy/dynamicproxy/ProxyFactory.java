package structuralPattern.proxy.dynamicproxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * @author xueshuo
 * @create 2023-06-17 3:56 pm
 */
public class ProxyFactory {

    private Object target;   // 维护target object

    public ProxyFactory(Object target) {    // inject dependency
        this.target = target;
    }

    // 给target object生成proxy object
    public Object getProxyInstance(){

        /**
         * java static Object newProxyInstance(ClassLoader loader,
         *                                     Class<?>[] interfaces,
         *                                     InvocationHandler h )
         *   1. Classloader loader: 指定当前target object的类加载器, 获取加载器的方法固定
         *   2. Class<?>[] interfaces: target object实现的接口类型, 使用泛型方法确认类型
         *   3. InvocationHandler h: 事件处理, 执行目标对象的方法, 会去触发事件处理器的方法, 会把当前执行的target object的方法作为
         *      参数传入
         */
        return Proxy.newProxyInstance(target.getClass().getClassLoader(), target.getClass().getInterfaces(), new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

                System.out.println("JDK proxy starts... do some operation");

                // 调用target object's method
                Object returnVal = method.invoke(target, args);

                System.out.println("JDK proxy ends... do some operation");

                return returnVal;
            }
        });
    }

}
