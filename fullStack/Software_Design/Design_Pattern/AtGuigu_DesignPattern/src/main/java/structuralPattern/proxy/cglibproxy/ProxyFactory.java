package structuralPattern.proxy.cglibproxy;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

/**
 * @author xueshuo
 * @create 2023-06-17 5:24 pm
 */
public class ProxyFactory implements MethodInterceptor {
    private Object target;  // maintain a target object

    public ProxyFactory(Object target) {        // dependency injection
        this.target = target;
    }

    public Object getProxyInstance(){       // return a proxy object for target object
        // 1. 创建一个工具类
        Enhancer enhancer = new Enhancer();

        // 2. 设置一个父类
        enhancer.setSuperclass(target.getClass());

        // 3. 设置callback function
        enhancer.setCallback(this);

        // 4. 创建子类对象, 即代理对象
        return enhancer.create();
    }


    /**
     * 重写intercept方法， 会调用目标对象的方法
     * @param obj "this", the enhanced object
     * @param method intercepted Method
     * @param args argument array; primitive types are wrapped
     * @param proxy used to invoke super (non-intercepted method); may be called
     * as many times as needed
     * @return
     * @throws Throwable
     */
    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.println("Cglib proxy starts... do some operations");

        Object returnVal = method.invoke(target, args);

        System.out.println("Cglib proxy ends... do some operations");
        return returnVal;
    }
}
