package structuralPattern.decorator.coffee;

/**
 * @author xueshuo
 * @create 2023-04-18 1:44 pm
 */
public class CoffeeBar {
    // 装饰者模式下的订单:2份巧克力+一份牛奶的LongBlack
    public static void main(String[] args) {
        // 1. 被装饰者
        Drink order = new LongBlack();
        System.out.println(order.cost());
        System.out.println(order.getDescription());

        // 2. 加入1份牛奶
        order = new Milk(order);
        System.out.println(order.cost());
        System.out.println(order.getDescription());

        // 3. 加入1份巧克力
        order = new Chocolate(order);
        System.out.println(order.cost());
        System.out.println(order.getDescription());

        // 4. 再加入1份巧克力
        order = new Chocolate(order);
        System.out.println(order.cost());
        System.out.println(order.getDescription());

        // order 2
        System.out.println("order2: ");

        Drink order2 = new Espresso();
        System.out.println(order2.cost());
        System.out.println(order2.getDescription());

        order2 = new Milk(order2);
        System.out.println(order2.cost());
        System.out.println(order2.getDescription());

    }
}
