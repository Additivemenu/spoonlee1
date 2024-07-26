package structuralPattern.bridge;

/**
 * @author xueshuo
 * @create 2023-08-08 11:54 am
 */
public class Vivo implements Brand{
    @Override
    public void open() {
        System.out.println("Vivo phone turn on");
    }

    @Override
    public void close() {
        System.out.println("Vivo phone turn off");
    }

    @Override
    public void call() {
        System.out.println("Vivo phone calling");
    }
}
