package block;

/**
 * 类的成员之四: 代码块
 *  1. 代码块的作用: 用来初始化类, 对象。 不能被主动调用, 而是被动执行
 *
 *  2. 代码块如果有修饰的话, 只能用static
 *        分类: 静态代码块 vs. 非静态代码块
 *
 *  3. 静态代码块
 *      > 内部可以有输出语句
 *      > 随着类的加载而执行, 而且只执行1次
 *      > 作用: 初始化类的信息
 *      > 如果一个类中定义了多个静态代码块, 则按照声明的先后顺序执行 (不过一般写1个就够了)
 *          > 静态代码块的执行要优先于非静态代码块的执行
 *      > 静态代码块内只能调用静态的结构, 不能调用非静态的结构
 *
 *  4. 非静态代码块
 *      > 内部可以有输出语句
 *      > 随着对象的创建而执行, 每当创建一个对象就执行1次非静态代码块
 *      > 作用: 可以在创建对象时, 对对象的属性进行初始化
 *             至此, 对属性(成员变量)可以赋值的位置:
 *                  默认初始化
 *                  显式初始化
 *                  构造器中初始化
 *                  有了对象之后, 通过"对象.属性" or "对象.方法"的方式进行赋值
 *                  在代码块中赋值
 *      > 如果一个类中定义了多个非静态代码块, 则按照声明的先后顺序执行(不过一般写1个就够了)
 *      > 非静态代码块内部, 可以调用静态的结构, 也可以调用非静态的结构
 *
 * @author xueshuo
 * @create 2023-03-17 4:57 pm
 */
public class BlockTest {
    public static void main(String[] args) {
       String desc = Person.desc;
        System.out.println(desc);

        Person person1 = new Person();
        Person person2 = new Person();
        System.out.println("age of person2 is" +  person2.age);
    }
}


class Person{

    String name;
    int age;
    static String desc = "I am a person";

    // constructors
    public Person(){

    }

    public Person(String name, int age){
        this.name = name;
        this.age = age;
    }

    // block ----------------------------------------
    // 静态代码块
    static {
        System.out.println("hello, static block - 1");
        desc = "I am a person loving Java!";
    }

    static {
        System.out.println("hello, static block - 2");
    }
    // 非静态代码块
    {
        System.out.println("hello, block - 1");
        this.age = 1;
    }

    {
        System.out.println("hello, block - 2");
    }


    // methods -------------------------------------
    public void eat(){
        System.out.println("eat");
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    public static void info(){
        System.out.println("I am a happy person");
    }
}