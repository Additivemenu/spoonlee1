package Abstract;

/**
 * 抽象类的匿名子类
 *
 * @author xueshuo
 * @create 2023-01-27 10:10 am
 */
public class PersonTest {

    public static void main(String[] args) {
        // 正常写法--------------
        method(new Student());      // 匿名对象: 没有对象变量名

        Worker worker = new Worker();
        method1(worker);  // 非匿名的类, 非匿名的对象

        method1(new Worker()); // 非匿名的类， 匿名的对象

        // -------------------
        System.out.println("抽象类的匿名子类");
        // 抽象类不能造对象, 但我们可以创建了抽象类的匿名子类的对象, 需要现成提供一下声明的抽象类中的抽象方法的实现
        // 这种写法很特殊, 允许我们现成提供一个抽象类中抽象方法的实现, 为了省事造出的对象只用一次
        Person p = new Person(){

            @Override
            public void talk() {
                System.out.println("I am Iron man!");
            }

            @Override
            public void breath() {
                System.out.println("take a deep breath");
            }
        };

        method1(p);

        // 创建匿名子类的匿名对象 --------------
        System.out.println("创建匿名子类的匿名对象 ");
        method1(new Person(){
            @Override
            public void talk() {
                System.out.println("创建匿名子类的匿名对象: I am Iron man!");
            }
            @Override
            public void breath() {
                System.out.println("创建匿名子类的匿名对象: take a deep breath");
            }

        });

    }


    public static void method(Student s){

    }

    public static void method1(Person p){
        p.breath();
        p.eat();
        p.walk();
        p.talk();
    }

}

class Worker extends Person{
    @Override
    public void eat(){

    }

    @Override
    public void breath(){

    }

    @Override
    public void talk(){

    }

}
