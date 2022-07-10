package chap4;
import java.time.*;;

// main function
public class code3_1_employee {
    public static void main(String[] args)
    {
        // fill the staff array with three employee objects
        Employee[] staff = new Employee[3];

        staff[0] = new Employee("carl Cracker", 75000, 1987, 12, 15);
        staff[1] = new Employee("Harry Hacker", 50000, 1989, 10, 1);
        staff[2] = new Employee("Tony Tester", 40000, 1990, 3, 15);

        for(Employee e: staff)
        System.out.println("name=" + e.getName() + ", salary=" + e.getSalary() + ", hireDay =" + e.getHireDay() );
        System.out.println("----------------------------------------");
        
        // raise everyone's salary by 5%
        for (Employee e:staff)
        e.raiseSalary(5);

        // print out info about all Employee objects
        for(Employee e: staff)
        System.out.println("name=" + e.getName() + ", salary=" + e.getSalary() + ", hireDay =" + e.getHireDay() );
    }
}

// define class
class Employee{
    private String name;
    private double salary;
    private LocalDate hireDay;
    
    // define properties
    public Employee(String n, double s, int year, int month, int day){
        name = n;
        salary = s;
        hireDay = LocalDate.of(year, month, day);
    }
    // define methods
    public String getName(){
        return name;
    }

    public double getSalary(){
        return salary;
    }

    public LocalDate getHireDay(){
        return hireDay;
    }

    public void raiseSalary(double byPercent){
        double raise = salary *byPercent / 100;
        salary += raise;
    }

}