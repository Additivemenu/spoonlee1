package structuralPattern.adapter.object_adapter;

/**
 * @author xueshuo
 * @create 2023-04-25 9:38 pm
 */
public class Client {
    public static void main(String[] args) {
        System.out.println(" class adapter mode");
        Phone phone = new Phone();
        phone.charging(new VoltageAdapter(new Voltage220V()));
    }
}
