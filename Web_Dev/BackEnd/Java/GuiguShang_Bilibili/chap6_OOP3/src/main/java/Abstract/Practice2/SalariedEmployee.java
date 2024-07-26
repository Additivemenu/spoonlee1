package Abstract.Practice2;

/**
 * 定义SalariedEmployee类继承Employee类，实现按月计算工资的员工处理。
 * 该类包括:private成员变量monthlySalary;
 * 实现父类的抽象方法earnings(),该方法返回monthlySalary值;
 * toString()方法输 出员工类型信息及员工的name，number,birthday。
 * @author xueshuo
 * @create 2023-01-27 9:54 pm
 */
public class SalariedEmployee extends Employee{

    private double monthlySalary;

    public double getMonthlySalary() {
        return monthlySalary;
    }

    public void setMonthlySalary(double monthlySalary) {
        this.monthlySalary = monthlySalary;
    }

    public SalariedEmployee(String name, int number, MyDate birthday, double monthlySalary) {
        super(name, number, birthday);
        this.monthlySalary = monthlySalary;
    }

    public SalariedEmployee(String name, int number, MyDate birthday) {
        super(name, number, birthday);
    }

    @Override
    public double earnings(){
        return monthlySalary;
    }


    public String toString(){
        return "SalariedEmployee: " + super.toString();
    }


}
