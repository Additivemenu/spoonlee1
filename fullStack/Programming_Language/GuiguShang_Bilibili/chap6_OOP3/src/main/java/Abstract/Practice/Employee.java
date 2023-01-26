package Abstract.Practice;

/**
 * 编写一个Employee类, 声明为抽象类
 *
 * @author xueshuo
 * @create 2023-01-27 9:49 am
 */
public abstract class Employee {

    private String name;
    private int id;
    private double salary;

    public Employee() {
    }

    public Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    public abstract void work();
}
