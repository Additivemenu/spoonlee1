package Enum;

/**
 * part1
 * 枚举类的使用:
 * 1. 枚举类的理解: 类的对象只有有限个, 确定的时候
 * 2. 当需要定义一组常量时， 强烈建议使用枚举类
 * 3. 如果枚举类中只有一个对象, 则可以作为单例模式一种实现方式 (见图解Java设计模式)
 *
 * part2
 * 如何定义枚举类
 * 方式1：JDK5.0 之前, 自定义枚举类
 *
 * 方式2: JDK5.0时, 可以使用Enum关键字定义枚举类
 *
 * part3
 * Enum类中常用方法
 *  values()方法:返回枚举类型的对象数组。该方法可以很方便地遍历所有的 枚举值。
 *  valueOf(String str):可以把一个字符串转为对应的枚举类对象。要求字符 串必须是枚举类对象的“名字”。如不是，会有运行时异常: IllegalArgumentException。
 *  toString():返回当前枚举类对象常量的名称
 *
 *  part4
 *  使用enum关键字定义的枚举类实现接口的情况.
 *  情况一: 实现接口， 在enum类中去实现抽象方法
 *  情况二: 让枚举类的对象, 分别去实现接口中的抽象方法
 *
 * @author xueshuo
 * @create 2023-04-16 9:08 pm
 */
public class SeasonTest {
    public static void main(String[] args) {
        Season spring = Season.SPRING;
        System.out.println(spring);
    }


}


// 自定义枚举类
class Season{
    // 1. 声明Season对象的属性: private final修饰
    private final String seasonName;
    private final String seasonDesc;

    // 2. 私有化构造器, 并给对象属性赋值
    private Season(String seasonName, String seasonDesc){
        this.seasonName = seasonName;
        this.seasonDesc = seasonDesc;
    }

    // 3. 提供当前枚举类的多个对象: public static final的
    // 一个类里存自己的对象, 太秀了
    public static final Season SPRING = new Season("spring", "spring is warm!");
    public static final Season SUMMER = new Season("summer", "summer is hot!");
    public static final Season FALL = new Season("fall", "fall is cool!");
    public static final Season WINTER = new Season("winter", "winter is cold!");

    // 4. 其他诉求: 获取枚举类对象的属性
    public String getSeasonName() {
        return seasonName;
    }

    public String getSeasonDesc() {
        return seasonDesc;
    }

    @Override
    public String toString() {
        return "Season{" +
                "seasonName='" + seasonName + '\'' +
                ", seasonDesc='" + seasonDesc + '\'' +
                '}';
    }
}
