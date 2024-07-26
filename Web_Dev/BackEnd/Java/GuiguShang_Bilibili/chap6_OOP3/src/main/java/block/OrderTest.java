package block;

/**
 *
 * 至此, 对属性(成员变量)可以赋值的位置:
 *       1. 默认初始化
 *       2. 显式初始化 3. 在代码块中赋值
 *       4. 构造器中初始化
 *       5. 有了对象之后, 通过"对象.属性" or "对象.方法"的方式进行赋值
 *
 *
 *  执行的先后顺序:
 *
 * @author xueshuo
 * @create 2023-03-17 6:24 pm
 */
public class OrderTest {
    public static void main(String[] args) {
        Order order = new Order();
        System.out.println(order.orderId);

    }
}

class Order{
    int orderId =3;

    {
        orderId = 4;
    }

}