package structuralPattern.proxy.dynamicproxy;

/**
 * @author xueshuo
 * @create 2023-06-17 4:08 pm
 */
public class Client {
    public static void main(String[] args) {
        // 创建target obj
        ITeacherDao teacherDao = new TeacherDao();

        // 给target obj创建proxy obj
        ITeacherDao proxyInstance = (ITeacherDao) new ProxyFactory(teacherDao).getProxyInstance();

        // proxyInstnace = class jdk.proxy1.$Proxy0
        // 内存中动态地生成了proxy object
        System.out.println("proxyInstnace = " + proxyInstance.getClass());

        // 通过proxy obj, 调用目标对象的方法
        proxyInstance.teach();

        proxyInstance.sayHello("tom");

    }
}
