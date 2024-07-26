package structuralPattern.proxy.staticproxy;

/**
 * @author xueshuo
 * @create 2023-06-17 3:36 pm
 */
public class Client {
    public static void main(String[] args) {
        // step1. instantiate target object
        TeacherDao teacherDao = new TeacherDao();

        // step2. instantiate proxy object and inject target into proxy object
        TeacherDaoProxy teacherDaoProxy = new TeacherDaoProxy(teacherDao);

        // step3: 通过代理对象, 间接调用target object的方法.
        teacherDaoProxy.teach();
    }
}
