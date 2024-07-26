package InnerClass;

/**
 * 359 - 363
 * 类的内部成员之五: Inner class
 * 1. Java允许将一个类A声明在另一个类B中, 则类A被称为内部类, 类B称为外部类
 *
 * 2. Inner class分类: 成员内部类(静态, 非静态) vs. 局部内部类 (方法内, 代码块内, 构造器内)
 *
 * 3. 成员内部类:
 *      一方面, 作为外部类的成员:
 *          > 可以调用外部类的结构 (e.g. 外部类的 field, method)
 *          > 可以被static修饰
 *          > 可以被4种不同的权限修饰
 *      另一方面, 作为一个类:
 *          > 类内可以定义属性, 方法, 构造器等
 *          > 可以被final修饰, 表示此类不能被继承. 不使用final, 就可以被继承
 *          > 可以被abstract修饰, 表示此类不能被实例化
 *
 * 4. 关注如下3个问题
 *  4.1 如何实例化成员内部类 361
 *  4.2 如何在成员内部类中去区分调用外部类的结构 362
 *  4.3 开发中局部内部类的使用 363: 见InnerClassTest1
 *
 * @author xueshuo
 * @create 2023-02-06 10:29 am
 */
public class InnerClassTest {
    public static void main(String[] args) {
        // instantiate Person.Brain (静态成员内部类): 只需要外部类即可实例化
        Person.Brain brain = new Person.Brain();
        brain.think();

        // instantiate Person.Leg (非静态成员内部类): 得先有外部类的实例
        Person p = new Person();
        Person.Leg leg = p.new Leg();       // 先有外部类实例, 然后对它的成员new
        leg.run();

        System.out.println();

        leg.display("侠胆柔情之大腿");
    }


}

class Person{
    String name = "Ming";
    int age;

    public void eat(){
        System.out.println("Person eat");
    }

    // 静态成员内部类
    static class Brain{
        String name;
        public Brain(){

        }
        public void think(){
            System.out.println("Brain think");
        }

    }

    // 非静态成员内部类
    class Leg{
        String name = Person.this.name + "'s left leg";
        public Leg(){

        }
        public void run(){
            System.out.println("leg run");

            Person.this.eat();      // 调用外部类的非静态方法
        }
        // 如何区分同命的属性
        public void display(String name){
            System.out.println(name);       // 方法的形参
            System.out.println(this.name);  // 内部类的属性
            System.out.println(Person.this.name);   // 外部类的属性
        }

    }


    public void method(){
        // 局部内部类 方法内
        class AA{}
    }

    {
        // 局部内部类 代码块内
        class BB{}
    }

    public Person(){
        // 局部内部类 构造器内
        class CC {}
    }

}