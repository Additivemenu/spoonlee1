package structuralPattern.adapter.object_adapter;

/**
 * @author xueshuo
 * @create 2023-04-25 9:34 pm
 */

// 适配器类
public class VoltageAdapter implements IVoltage5V {

    private Voltage220V voltage220V;        // aggregation

    public VoltageAdapter(Voltage220V voltage220V) {
        this.voltage220V = voltage220V;
    }

    @Override
    public int output5V() {
        int dst = 0;
        if(null != voltage220V){
            int src = voltage220V.output220V();     // 获取220V 电压
            System.out.println("use object adapter to convert service");
            dst = src/44;
            System.out.println("output voltage is " + dst + " V");
        }

        return dst;
    }
}
