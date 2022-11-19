import java.util.*;

public class code4_5_constructorTest{//==============================================================================

    public static void main(String[] args)
    {
         // fill the staff array with three Employee objects
         var staff = new Employee[3];

         staff[0] = new Employee("Harry", 40000);
         staff[1] = new Employee(60000);
         staff[2] = new Employee();

         // print out information about all Employee objects
         for (Employee e:staff){
            System.out.println("name="+e.getName()+",id="+e.getId()+",salary="+e.getSalary());
         }
    }

    static class Employee{//========================================================================================
        // step1: ----------------------------------------------------------------------------------------------
        private static int nextId;

        private int id;
        private String name = ""; //instance field initialization
        private double salary;

        // static initialization block: run only when the class is firstly called
        static{
            var generator = new Random(); // 构造一个新的随机数生成器
            //set nextId to a random number between 0 and 9999
            nextId = generator.nextInt(10000); // an API, return a random num between 0 to (n-1)
        }

        //object initialization block: run whenever a new object is constructed
        {
            id = nextId; // take shared static field (class field) 
            nextId++; // id + 1
        }

        // step2: three overloaded constructors -----------------------------------------------------------------
        public Employee(String n, double s){
            name = n;
            salary = s;
        }

        public Employee(double s){
            //calls the Employee(String, double) constructor
            this("Employee #" + nextId, s);
        }

        // the default constructor
        public Employee(){
            // name initialized to "" -- see above
            // salary not explicitly set -- initialized to 0
            // id initialized in initialization block
        }

        // step3: methods ----------------------------------------------------------------------------------
        public String getName(){
            return name;
        }

        public double getSalary(){
            return salary;
        }

        public int getId(){
            return id;
        }

    }

}