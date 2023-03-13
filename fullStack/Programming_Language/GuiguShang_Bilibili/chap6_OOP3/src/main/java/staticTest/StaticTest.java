package staticTest;

/**
 * static关键字
 * 1. static 静态的
 * 2. static可以用来修饰的结构: 属性, 方法, 代码块, 内部类
 *
 * 3. 使用static修饰属性: 静态变量 (类变量)
 *    3.1 属性按是否被static修饰又分为: 静态属性 vs. 非静态属性(实例变量)
 *        实例变量： 我们创建了类的多个对象, 每个对象都独立地拥有一套类中的非静态属性, 当修改其中一个对象的非静态
 *                  属性时， 不会导致其他对象中同样的属性值的修改.
 *        静态变量: 我们创建了类的多个对象, 多个对象共享同一个静态变量. 当通过某一个对象修改静态变量时.
 *                 会导致其他对象调用次静态变量时, 也是修改过的.
 *    3.2 static 修饰属性的其他说明
 *        静态变量随着类的加载而加载, 可以通过"类.静态变量"的方式进行调用
 *        静态变量的加载要早于对象的创建
 *        由于类只会加载一次, 则静态变量在内存中也只会存在一份: 存在方法区的静态域中
 *
 *        能否调用       类变量         实例变量
 *        通过类          yes            no
 *        通过对象        yes            yes
 *
 *    3.3. 静态属性举例: System.out; Math.PI
 *
 *
 * 4. 使用static修饰方法
 *
 *
 * @author xueshuo
 * @create 2023-03-14 8:58 am
 */
public class StaticTest {
    public static void main(String[] args) {

        Chinese.nation = "中国";     // 静态变量随着类的加载而加载

        Chinese c1 = new Chinese();
        c1.name = "姚明";
        c1.age = 40;

        Chinese c2 = new Chinese();
        c2.name = "马龙";
        c2.age = 30;

        c1.nation = "CHN";
        c2.nation = "CHINA";
        System.out.println(c2.nation);  // "CHINA"


    }
}

class Chinese{
    String name;
    int age;

    static String nation;

}
