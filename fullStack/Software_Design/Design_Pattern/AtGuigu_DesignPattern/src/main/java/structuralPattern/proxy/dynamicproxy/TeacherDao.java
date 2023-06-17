package structuralPattern.proxy.dynamicproxy;

/**
 * @author xueshuo
 * @create 2023-06-17 3:55 pm
 */
public class TeacherDao implements ITeacherDao{
    @Override
    public void teach() {
        System.out.println("teacher is teaching ...");
    }
    @Override
    public void sayHello(String name) {
        System.out.println("hello, " + name);
    }

}
