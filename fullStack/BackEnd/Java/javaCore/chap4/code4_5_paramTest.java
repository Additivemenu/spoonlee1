public class code4_5_paramTest {
    public static void main(String[] args)
    {
        // test1: Method can't modify numeric parameters----------------------
        System.out.println("Test tripleValue:");
        double percent = 10;
        System.out.println("Before: percent=" + percent); // 10
        tripleValue(percent); // End of method x =30
        System.out.println("After: percent=" + percent);  // 10

        // test2: Methods can change the state of object parameters-----------
        System.out.println("\nTesting tripleSalary:");
        var harry = new Employee("Harry", 5000);
        System.out.println("Before: salary = " + harry.getSalary()); // 50000.0
        tripleSalary(harry);    // End of method: salary = 150000.0
        System.out.println("After: salary =" + harry.getSalary()); // salary=150000.0

        // test3: methods can't attach new objects to object parameters-------
        // this test proves that Java "call by value", because if Java "call by reference" then the swap will succeed
        System.out.println("\nTesting swap:");
        var a = new Employee("Alice",70000);
        var b = new Employee("Bob", 60000);
        System.out.println("Before: a=" + a.getName()); // Before: a = Alice
        System.out.println("Before: b=" + b.getName()); // Before: b = Bob
        swap(a,b); // End of method: x = Bob,  y = Alice 
        System.out.println("After: a=" + a.getName()); // After: a = Alice
        System.out.println("After: b=" + b.getName()); // After: a = Bob

    }

    // for test1
    public static void tripleValue(double x){
        x = 3*x;
        System.out.println("End of method: x=" + x);
    }
    // for test2
    public static void tripleSalary(Employee x){
        x.raiseSalary(200);
        System.out.println("End of method: salary=" + x.getSalary());
    }
    // for test3
    public static void swap(Employee x, Employee y){
        Employee temp = x;
        x=y;
        y=temp;
        System.out.println("End of method: x=" + x.getName());
        System.out.println("End of method: y=" + y.getName());

    }
}

class Employee { // simplified Employee class===============================
    // fields----------------------------
    private String name;
    private double salary;

    // constructor-----------------------
    public Employee(String n, double s){
        name = n;
        salary = s;
    }

    // methods--------------------------
    public String getName(){
        return name;
    }

    public double getSalary(){
        return salary;
    }

    public void raiseSalary(double byPercent){
        double raise = salary* byPercent / 100;
        salary += raise; 
    }
}
