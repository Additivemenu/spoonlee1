package Polymorph;

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

    }
}
