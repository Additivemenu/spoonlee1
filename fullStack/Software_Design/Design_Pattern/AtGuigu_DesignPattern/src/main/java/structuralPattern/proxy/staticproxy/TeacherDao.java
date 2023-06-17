package structuralPattern.proxy.staticproxy;

/**
 * @author xueshuo
 * @create 2023-06-17 3:30 pm
 */
public class TeacherDao implements ITeacherDao{
    @Override
    public void teach() {
        System.out.println("Teacher is teaching...");
    }
}
