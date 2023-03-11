package Downcasting;

/**
 * 面向对象: 多态
 *
 * 1. 理解: 可以理解为一种事物的多种形态
 * 2. 何为多态: 对象的多态性: 父类的引用指向子类的对象 (子类的对象赋值给父类的引用)
 *
 * 3. 多态的使用: 虚拟方法调用
 *      有了对象的多态性之后, 我们在编译期, 只能调用父类中声明的结构, 但在运行期, 我们实际执行的是子类重写父类的方法
 *      总结: 编译看左边， 运行看右边  `Person p2 = new Man();` p2引用 在编译时视为Person类, 运行时体现子类Man的行为
 *
 * 4. 多态的使用前提
 *      1) 类的继承关系.
 *      2) 方法的重写.
 *
 *
 * @author xueshuo
 * @create 2023-03-10 10:23 am
 */
public class PersonTest {

    public static void main(String[] args) {
        Person p1 = new Person();
        p1.eat();

        Man man = new Man();
        man.eat();
        man.age = 25;
        man.earnMoney();

        // 多态
        // 对象的多态性: 父类的引用指向子类的对象
        System.out.println();
        Person p2 = new Man();

        // 多态的使用
        // 当调用子父类同名同参数的方法时, 实际上执行的是子类重写父类的方法 --- 虚拟方法调用
        p2.eat();           // 子类重写父类的方法
        p2.walk();

        // 编译失败: 调用不了子类特有的方法
        // p2.earnMoney();

        System.out.println("***********-------down casting---******************");

        // 不能通过父类的引用来调用子类的特有方法 与 属性. 编译时认为p2是Person类型
//        p2.earnMoney();
//        p2.isSmokin = true;

        // 有了对象的多态之后, 内存中实际是加载了子类特有的属性和方法的, 但是由于变量声明为父类类型
        // 导致编译时, 只能调用父类中声明的属性和方法, 子类中特有的属性和方法不能被调用

        // 如何才能调用子类特有的属性和方法?  --- 使用强制类型转换符 (down casting)
        Man m1 = (Man) p2;
        m1.earnMoney();
        System.out.println(m1.isSmoking);

        // 使用强转时可能出现, ClassCastException
//        Woman w1 = (Woman) p2;      // 编译通过了, 但是运行时会throw ClassCastException
//        w1.goShopping();

        /**
         * instanceof 关键字
         *
         * a instanceof A: 判断对象a是否是类A的实例. 如果是， 则返回true, 如果不是则返回false
         *
         * 使用情景， 为了保证在down casting时避免CLassCastException, 往往需要先用instanceof 来判断
         * 一旦返回true, 就进行down casting, 否则不进行
         *
         * instanceof 判断的是 a 指向的堆空间中的对象的本质类型, 就是new 的是什么类的对象
         *
         * 如果 a instance of A 返回true, 则 a instanceof B 也会返回true, 其中B 是A 的父类
         *
         */
        if(p2 instanceof Woman){
            Woman w2 = (Woman) p2;
            w2.goShopping();
            System.out.println("Woman");
        }

        // 问题一: 编译时通过, 运行时不通过
//        // 举例一
//        Person p3 = new Woman();
//        Man man3 = (Man) p3;

//        // 举例二
//        Person p4 = new Person();
//        Man man4 = (Man) p4;

        // 问题二: 编译通过, 运行时也通过
        Object obj = new Woman();
        Person person = (Person) obj;

        // 问题三: 编译不通过
//        Man man5 = new Woman();     // type mismatch
//
//        String str = new Date();

//        // 骗编译器, 不想关的两个类不可以赋值
//        Object o = new Date();
//        String str2 = (String) o;

    }
}
