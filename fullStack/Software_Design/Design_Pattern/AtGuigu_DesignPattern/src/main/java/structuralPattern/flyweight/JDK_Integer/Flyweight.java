package structuralPattern.flyweight.JDK_Integer;

/**
 * @author xueshuo
 * @create 2023-11-14 9:45 pm
 */
public class Flyweight {
    public static void main(String[] args) {
        // 如果是通过Integer.valueOf(x):  x 在[-128, 128), 则使用享元模式返回, 否则返回new Integer(x)
        // 小结:
        // 1. 在valueOf() 方法中, 先判断值是否在IntegerCache中, 如果不在, 就创建新的Integer对象 (new Integer(x)), 否则就直接从
        //    缓存池中返回
        // 2. valueOf() 方法就使用了flyweight pattern. 如果valueOf()得到一个[-128, 127)的Integer instance, 执行速度比new Integer(x)快

        Integer x = Integer.valueOf(127);
        Integer y = new Integer(127);
        Integer z = Integer.valueOf(127);
        Integer w = new Integer(127);
        System.out.println(x.equals(y)); // true
        System.out.println(x == y); // false
        System.out.println(x == z); // *** true
        System.out.println(w == x); // false
        System.out.println(w == y); // false

        Integer x1 = Integer.valueOf(200);
        Integer x2 = Integer.valueOf(200);
        System.out.println(x1 == x2);       // false
    }
}
