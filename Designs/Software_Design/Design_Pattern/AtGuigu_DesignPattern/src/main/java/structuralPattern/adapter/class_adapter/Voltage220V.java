package structuralPattern.adapter.class_adapter;

/**
 * @author xueshuo
 * @create 2023-04-25 9:32 pm
 */

// 被适配的类
public class Voltage220V {

    // 输出220V的电压
    public int output220V(){
        int src = 220;
        System.out.println("voltage is " + src + " V");
        return src;
    }
}
