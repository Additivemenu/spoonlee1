package Interface;

/**
 * P348-
 * 接口的使用
 * 1. 接口使用interface关键字来定义
 * 2. 在Java中, interface和class是并列的两个结构
 * 3. 如何定义接口: 定义接口中的成员
 *    3.1 JDK7及以前
 *        接口中只能定义 全局常量 和 抽象方法
 *        > 全局常量: public static final的, 但在interface里书写可以省略 (默认自动给你加上了)
 *        > 抽象方法: public abstract的, 但在interface里书写可以省略
 *
 *    3.2 JDK8: 除了定义 全局常量 和 抽象方法外, 接口中还可定义静态方法, 默认方法
 *
 *  4. 接口中是不能定义构造器的!!! 意味着接口不可以被实例化
 *
 *  5. Java开发中, 接口通过让类去实现(implements)的方式来使用
 *      如果实现接口的类重写(override)了接口中的所有抽象方法, 则该实现类就可以实例化
 *      如果实现类没有实现接口中的所有抽象方法, 则此实现类仍然为抽象类, 不能够实例化
 *
 *  6. Java class可以实现多个接口 ---> 弥补了Java class的单继承性的局限性
 *      格式: class AA extends BB implements CC, DD, EE{}
 *
 *  7. 接口与接口之间可以继承, 且可以多继承
 *
 *  ***********************************8
 *  8. 接口的具体使用, 体现多态性
 *
 *  9. 接口实际上可以被看作一种协议, 规范
 *
 *  面试题: 抽象类与接口有哪些异同?
 *
 *
 * @author xueshuo
 * @create 2023-01-28 1:46 pm
 */
public class InterfaceTest {

    public static void main(String[] args) {
        System.out.println(Flyable.MAX_SPEED);
        System.out.println(Flyable.MIN_SPEED);

        Plane plane = new Plane();
        plane.fly();

    }

}

interface Attackable{
    void attack();

}

interface Flyable{
    // 全局常量 public static final可省略不写
    int MAX_SPEED = 7900;  // 第一宇宙速度km/s
    int MIN_SPEED = 1;

    // 抽象方法 public abstract可省略不写
    void fly();
    void stop();


}


class Plane implements Flyable{

    @Override
    public void fly() {
        System.out.println("Plane fly by aircraft engine");
    }

    @Override
    public void stop() {
        System.out.println("slow till stop");
    }
}

abstract class Kite implements Flyable{

    @Override
    public void fly() {

    }
}

class Bullet extends Object implements Flyable, Attackable, CC{

    @Override
    public void attack() {

    }

    @Override
    public void fly() {

    }

    @Override
    public void stop() {

    }

    @Override
    public void method1() {

    }

    @Override
    public void method2() {

    }
}

// 接口的多继承 ********************************************
interface AA {
    void method1();
}

interface BB{
    void method2();
}

interface CC extends AA, BB{

}