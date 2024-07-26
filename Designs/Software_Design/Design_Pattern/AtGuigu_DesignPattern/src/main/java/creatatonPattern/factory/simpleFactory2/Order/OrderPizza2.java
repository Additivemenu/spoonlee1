package creatatonPattern.factory.simpleFactory2.Order;

import creatatonPattern.factory.simpleFactory2.pizza.Pizza;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * 使用静态工厂方法 (简单工厂方法的另一种实现)
 *
 * @author xueshuo
 * @create 2023-04-09 3:28 pm
 */
public class OrderPizza2 {

    Pizza pizza = null;
    String orderType = "";

    public OrderPizza2(){
        do{
            orderType = getType();   // for user input

            pizza = SimpleFactory.createPizza2(orderType);

            // 输出pizza
            if(pizza != null) {     // 订购成功
                pizza.prepare();
                pizza.bake();;
                pizza.cut();
                pizza.box();
            } else {
                System.out.println("fail to order a pizza!");
                break;
            }
        }while(true);
    }



    // 可以动态获取客户希望的披萨种类
    private String getType() {
        try {
            BufferedReader strin = new BufferedReader(new InputStreamReader(System.in));
            System.out.println("input pizza type:");
            String str = strin.readLine();
            return str;
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }

}
