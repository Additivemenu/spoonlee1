package structuralPattern.adapter.class_adapter;

/**
 * @author xueshuo
 * @create 2023-04-25 9:34 pm
 */

// 适配器类
public class VoltageAdapter extends Voltage220V implements IVoltage5V {

    @Override
    public int output5V() {
        int srcV = output220V();
        int dstV = srcV/44;
        return dstV;
    }
}
