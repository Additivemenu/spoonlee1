package Abstract;

/**
 * abstract 关键字的使用
 * abstract可以修饰的结构: class, method
 *        1) 修饰class:
 *              > this class can not be instantiated
 *              > but abstract class still provides constructors, 以便于其子类实例化
 *              > 开发中, 都会提供抽象类的子类, 让子类实例化, 完成操作
 *
 *        2)  修饰method:
 *              > 抽象方法只有方法的声明, 没有方法体
 *              > 抽象方法所在的类, 也必须是抽象类. 但抽象类中可以没有抽象方法 (比如Java final中我们的BaseProgram类, 它的子类只想继承它的读取文件的方法， 但我们并不想实例化它)
 *              > 若子类overwrite父类中的所有抽象方法后, 则此子类方可实例化
 *                若子类没有overwrite父类中的所有抽象方法, 则此子类依然是抽象类
 *
 *
 * @author xueshuo
 * @create 2023-01-24 10:43 am
 */
public class AbstractTest {

    // once Person is abstract, it can not be instantiated
//    public static void main(String[] args) {
//        Person p1 = new Person();
//        p1.eat();
//    }


}


abstract class Creature{
    public abstract void breath();

}

abstract class Person extends Creature{
    String name;
    int age;

    public Person(){

    }

    public void Person(String name, int age){
        this.name = name;
        this.age = age;
    }

    public void eat(){
        System.out.println("eat");
    }
    public void walk(){
        System.out.println("walk");
    }

    public abstract void talk();

}


class Student extends Person {

    @Override
    public void breath() {
        System.out.println("student breath");
    }

    @Override
    public void talk(){

    }

}