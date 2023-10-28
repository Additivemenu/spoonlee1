package CollectionInterface.TreeSetPractice;

/**
 * 定义一个Employee class
 * 该类包含: private 成员变量 name, age, birthday, 其中birthday 为 MyDate类的对象;
 * 并为每一个属性定义getter, setter
 * 并重写toString(), 输出name, age, birthday
 *
 * @author xueshuo
 * @create 2023-01-18 7:48 pm
 */
public class Employee implements Comparable {
    private String name;
    private int age;
    private MyDate birthday;

    public Employee() {
    }

    public Employee(String name, int age, MyDate birthday) {
        this.name = name;
        this.age = age;
        this.birthday = birthday;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public MyDate getBirthday() {
        return birthday;
    }

    public void setBirthday(MyDate birthday) {
        this.birthday = birthday;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", birthday=" + birthday +
                '}';
    }

    @Override
    public int compareTo(Object o) {
        if(o instanceof Employee){
            Employee e = (Employee)o;
            return this.name.compareTo(e.name);
        }else{
            throw new RuntimeException("input type not matched!");
        }
    }
}
