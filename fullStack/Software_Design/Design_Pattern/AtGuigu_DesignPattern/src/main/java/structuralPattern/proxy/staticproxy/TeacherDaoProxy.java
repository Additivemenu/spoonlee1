package structuralPattern.proxy.staticproxy;

/**
 * 代理对象（静态代理）
 * @author xueshuo
 * @create 2023-06-17 3:30 pm
 */
public class TeacherDaoProxy implements ITeacherDao{
    private ITeacherDao targetTeacherDao;   // 真正的目标对象, 通过接口来聚合

    public TeacherDaoProxy(ITeacherDao targetTeacherDao) {      // dependency injection
        super();
        this.targetTeacherDao = targetTeacherDao;
    }

    @Override
    public void teach() {
        // 1. TODO: work to do before proxy business logic
        System.out.println("proxy starts... do some operation");

        // 2. business logic
        targetTeacherDao.teach();

        // 3. TODO: work to do after proxy business logic
        System.out.println("proxy ends... do some operation");
    }
}
