package Abstract.Practice;

/**
 *
 * @author xueshuo
 * @create 2023-01-27 9:55 am
 */
public class EmployeeTest {
    public static void main(String[] args) {
        // polymorph
        Employee manager = new Manager("cook", 1001, 5000, 50000);
        manager.work();

        CommonEmployee commonEmployee = new CommonEmployee();
        commonEmployee.work();


    }



}
