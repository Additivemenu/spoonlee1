package creatatonPattern.factory.simpleFactory;

/**
 * @author xueshuo
 * @create 2023-03-19 9:17 am
 */
public class CheesePizza extends Pizza{
    @Override
    public void prepare() {
        System.out.println("Prepare cheese for cheese pizza");
    }
}
