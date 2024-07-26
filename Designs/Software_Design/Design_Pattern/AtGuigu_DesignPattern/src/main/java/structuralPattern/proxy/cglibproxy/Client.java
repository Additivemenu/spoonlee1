package structuralPattern.proxy.cglibproxy;

/**
 * @author xueshuo
 * @create 2023-06-17 8:14 pm
 */
public class Client {
    public static void main(String[] args) {
        // 创建目标对象
        TeacherDao teacherDao = new TeacherDao();
        // 创建代理工厂, inject target obj to proxy obj
        TeacherDao proxyInstance = (TeacherDao) new ProxyFactory(teacherDao).getProxyInstance();
        // 执行proxy obj的方法 ---> trigger intercept() method, 从而实现对target obj的方法调用
        proxyInstance.teach();

    }
}
