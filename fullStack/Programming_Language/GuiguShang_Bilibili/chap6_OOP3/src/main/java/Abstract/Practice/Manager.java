package Abstract.Practice;

/**
 * 对于Manager来说, 他既是员工, 还有奖金(bonus)属性
 *
 * @author xueshuo
 * @create 2023-01-27 9:51 am
 */
public class Manager extends Employee{
    private double bonus;

    public Manager(double bonus) {
        super();
        this.bonus = bonus;
    }

    public Manager(String name, int id, double salary, double bonus) {
        super(name, id, salary);
        this.bonus = bonus;
    }

    @Override
    public void work(){
        System.out.println("Manager manages employees");
    }

}
