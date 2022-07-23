public class code4_4_staticTest {
    public static void main(String[] args)
    {
        // fill the staff array with three Employee objects
        var staff = new Employee[3];

        staff[0] = new Employee("Tom", 40000);
        staff[1] = new Employee("Dick", 60000);
        staff[2] = new Employee("Harry", 65000);

        // print out info about all Employee objects
        for(Employee e : staff){
            e.setId(); // objects shares nextId, nextId++
            System.out.println("name=" + e.getName() + ", id=" + e.getId() 
            + ", salary=" + e.getSalary());
        }

        int n = Employee.getNextId(); // calls static method
        System.out.println("Next available id = " + n);

    }

    static class Employee{
        // fields---------------------
        private static int nextId = 1;

        private String name;
        private double salary;
        private int id;

        // constructor----------------
        public Employee(String n, double s){
            name = n;
            salary = s;
            id = 0;
        }

        // methods--------------------
        public String getName(){
                return name;
        }

        public double getSalary(){
            return salary;
        }

        public int getId(){
            return id;
        }

        public void setId(){ //since we will use id, which is an instance field, 
        // so we are not using "static" to this method    
        
            id = nextId; // set id to next available id
            nextId++;
        }

        public static int getNextId(){ // since it has nothing to do with
        // any instances to get nextId, so we use "static" to this method  
            return nextId;
        }

        public static void main(String[] args){ // unit test
            var e = new Employee("Harry", 50000);
            System.out.println(e.getName() + "" + e.getSalary());
        }

    }
}
