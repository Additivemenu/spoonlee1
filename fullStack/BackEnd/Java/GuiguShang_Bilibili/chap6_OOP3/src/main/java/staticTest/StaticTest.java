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
 *      随着类的加载而加载, 可以通过"类.静态方法"来调用
 *
 *       能否调用        静态方法         非静态方法
 *       通过类          yes            no
 *       通过对象        yes            yes
 *
 *      静态方法中, 只能调用静态的方法或属性， 因为他们的生命周期是一致的
 *      非静态方法中, 既可以调用非静态的方法或属性，也可以调用静态的方法或属性
 * 5.  static 注意点
 *      在静态的方法内, 不能使用this, super关键字
 *      关于静态属性和静态方法的使用, 大家都从生命周期的角度去理解
 * 6. 开发中如何确定一个属性是否要被声明为static?
 *      > 属性是可以被多个对象所共享的, 不会随着对象的不同而不同的.
 *      > 类中的常量也常常声明为static
 *
 *    开发中如何确定一个方法是否要被声明为static?
 *      > 操作静态属性的方法, 通常就设置为static (非静态的方法也可以调用静态属性, 但是方便期间保证他们的生命周期一致)
 *      > 工具类中的方法, 习惯上声明为static的. 比如, Math, Arrays, Collections
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

        c1.eat();
        Chinese.show();



    }
}

class Chinese{
    String name;
    int age;

    static String nation;

    public void eat(){
        System.out.println("中国人吃中餐");
        // 调用非静态结构
        System.out.println(name);

        info();

        // 调用静态结构
        walk();
        System.out.println("nation: "+ nation);
    }

    public void info(){
        System.out.println(name + age);
    }


    public static void show(){
        System.out.println("I am a Chinese");
        // 不能调用非静态结构
//        eat();
//        name = "Tom"

        // 可以调用静态结构
        System.out.println(nation);
        walk();
    }

    public static void walk (){

    }


}
