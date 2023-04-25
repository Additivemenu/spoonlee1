package structuralPattern.adapter.class_adapter;

/**
 * @author xueshuo
 * @create 2023-04-25 9:36 pm
 */
public class Phone {
    // charging
    public void charging(IVoltage5V iVoltage5V){
        if(iVoltage5V.output5V() == 5){
            System.out.println("Voltage is 5V, we can charge the phone");
        } else if (iVoltage5V.output5V() > 5){
            System.out.println("Voltage is bigger than 5V, don't charge");
        }
    }
}
