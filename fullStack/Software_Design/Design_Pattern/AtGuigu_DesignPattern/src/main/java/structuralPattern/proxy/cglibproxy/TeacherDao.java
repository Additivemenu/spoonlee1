package structuralPattern.proxy.cglibproxy;

/**
 * @author xueshuo
 * @create 2023-06-17 5:23 pm
 */
public class TeacherDao {
    public void teach(){
        System.out.println("teacher is teaching... I am proxyed by cglib, no need to implement any interface");
    }
}
