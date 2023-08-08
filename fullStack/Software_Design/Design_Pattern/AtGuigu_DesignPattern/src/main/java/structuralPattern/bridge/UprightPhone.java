package structuralPattern.bridge;

/**
 * @author xueshuo
 * @create 2023-08-08 12:08 pm
 */
public class UprightPhone extends Phone{

    public UprightPhone(Brand brand) {
        super(brand);
    }

    public void open(){
        super.open();
        System.out.println("Upright phone:");
    }

    public void close(){
        super.close();
        System.out.println("Upright phone:");
    }

    public void call(){
        super.call();
        System.out.println("Upright phone:");
    }
}
