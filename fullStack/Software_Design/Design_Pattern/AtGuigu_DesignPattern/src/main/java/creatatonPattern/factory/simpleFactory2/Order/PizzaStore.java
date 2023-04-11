package creatatonPattern.factory.simpleFactory2.Order;

/**
 * 相当于一个客户端. 发出订购
 *
 * @author xueshuo
 * @create 2023-03-19 9:25 am
 */
public class PizzaStore {

    public static void main(String[] args) {
//        OrderPizza orderPizza = new OrderPizza();

        // 方式一: 使用简单工厂模式
//        new OrderPizza(new SimpleFactory());
//        System.out.println("exit application");

        // 方式二: 使用静态工厂模式
        new OrderPizza2();

    }

}
