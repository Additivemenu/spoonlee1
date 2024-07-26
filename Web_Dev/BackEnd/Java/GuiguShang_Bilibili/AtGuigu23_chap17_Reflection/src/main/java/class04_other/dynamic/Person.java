package class04_other.dynamic;

/**
 * P192 14min-: 体会反射的动态性
 *
 * @author 尚硅谷-宋红康
 * @create 9:35
 */
public class Person {
    //属性
    private String name;
    public int age;

    //构造器
    public Person(){
        System.out.println("Person()...");
    }

    public Person(int age){
        this.age = age;
    }

    private Person(String name, int age){
        this.name = name;
        this.age = age;
    }

    //方法
    public void show(){
        System.out.println("你好，我是一个Person");
    }

    private String showNation(String nation){
        return "我的国籍是：" + nation;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

