package structuralPattern.bridge;

/**
 * @author xueshuo
 * @create 2023-08-08 11:53 am
 */
public class Xiaomi implements Brand{
    @Override
    public void open() {
        System.out.println("Xiaomi phone turn on");
    }

    @Override
    public void close() {
        System.out.println("Xiaomi phone turn off");
    }

    @Override
    public void call() {
        System.out.println("Xiaomi phone calling");
    }
}
