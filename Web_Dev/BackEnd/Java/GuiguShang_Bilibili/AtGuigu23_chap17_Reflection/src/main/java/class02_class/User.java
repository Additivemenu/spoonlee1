package class02_class;

/**
 * @author xueshuo
 * @create 2023-02-19 9:59 am
 */
public class User {
    private String name;
    public int age;

    // constructor
    public User() {
        System.out.println("Person()...");
    }

    public User(int age) {
        this.age = age;
    }

    private User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // methods
    public void show(){
        System.out.println("hello, I am a person!");
    }

    private String showNation(String nation){
        return "my nationality is" + nation;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
