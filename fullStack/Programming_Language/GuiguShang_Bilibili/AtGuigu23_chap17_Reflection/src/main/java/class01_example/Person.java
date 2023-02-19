package class01_example;

/**
 * @author xueshuo
 * @create 2023-02-19 9:59 am
 */
public class Person {
    private String name;
    public int age;

    // constructor
    public Person() {
        System.out.println("Person()...");
    }

    public Person(int age) {
        this.age = age;
    }

    private Person(String name, int age) {
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
