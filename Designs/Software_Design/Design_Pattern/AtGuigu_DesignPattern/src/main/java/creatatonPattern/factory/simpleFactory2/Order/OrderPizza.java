package creatatonPattern.factory.simpleFactory2.Order;

import creatatonPattern.factory.simpleFactory2.Order.SimpleFactory;
import creatatonPattern.factory.simpleFactory2.pizza.Pizza;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * 使用简单工厂模式
 *
 * @author xueshuo
 * @create 2023-03-19 9:19 am
 */
public class OrderPizza {

    // 定义简单工厂对象
    SimpleFactory simpleFactory;
    Pizza pizza = null;

    // constructor
    public OrderPizza(SimpleFactory simpleFactory){     // 采用aggregation, simpleFactory是从外部传入的
        setSimpleFactory(simpleFactory);
    }

    public void setSimpleFactory(SimpleFactory simpleFactory){
        String orderType = "";      // 用户输入

        this.simpleFactory = simpleFactory;     // 设置简单工厂对象

        do{
           orderType = getType();   // for user input

           pizza = this.simpleFactory.createPizza(orderType);

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
