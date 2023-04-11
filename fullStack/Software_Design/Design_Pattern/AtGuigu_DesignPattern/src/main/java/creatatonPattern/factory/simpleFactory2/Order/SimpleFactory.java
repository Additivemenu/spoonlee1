package creatatonPattern.factory.simpleFactory2.Order;

import creatatonPattern.factory.simpleFactory2.pizza.CheesePizza;
import creatatonPattern.factory.simpleFactory2.pizza.GreekPizza;
import creatatonPattern.factory.simpleFactory2.pizza.Pizza;

/**
 * @author xueshuo
 * @create 2023-04-09 3:04 pm
 */
public class SimpleFactory {

    // 根据orderType, 返回对应的Pizza对象
    public Pizza createPizza(String orderType){

        Pizza pizza = null;
        System.out.println("use simple factory to create Pizza object");

        if(orderType.equals("greek")){
            pizza = new GreekPizza();
            pizza.setName("greek pizza");
        }else if(orderType.equals("cheese")){
            pizza = new CheesePizza();
            pizza.setName("cheese pizza");
        }

        return pizza;
    }



    // 简单工厂模式, 也叫静态工厂模式
    public static Pizza createPizza2(String orderType){

        Pizza pizza = null;
        System.out.println("use simple factory to create Pizza object");

        if(orderType.equals("greek")){
            pizza = new GreekPizza();
            pizza.setName("greek pizza");
        }else if(orderType.equals("cheese")){
            pizza = new CheesePizza();
            pizza.setName("cheese pizza");
        }

        return pizza;
    }

}
