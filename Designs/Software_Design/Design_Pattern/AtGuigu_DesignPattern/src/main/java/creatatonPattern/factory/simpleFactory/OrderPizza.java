package creatatonPattern.factory.simpleFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * @author xueshuo
 * @create 2023-03-19 9:19 am
 */
public class OrderPizza {
    //
    public OrderPizza(){
        Pizza pizza = null;
        String orderTypes; // 订购Pizza的类型
        do{
            orderTypes = getType();
            if(orderTypes.equals("greek")){
                pizza = new GreekPizza();
                pizza.setName("greek pizza");
            }else if(orderTypes.equals("cheese")){
                pizza = new CheesePizza();
                pizza.setName("cheese pizza");
            } else{
                break;
            }
            // 输出Pizza制作过程
            pizza.prepare();
            pizza.bake();
            pizza.cut();
            pizza.box();
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
