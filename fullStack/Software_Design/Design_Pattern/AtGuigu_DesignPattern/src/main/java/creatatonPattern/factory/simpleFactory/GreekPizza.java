package creatatonPattern.factory.simpleFactory;

/**
 * @author xueshuo
 * @create 2023-03-19 9:18 am
 */
public class GreekPizza extends Pizza{

    @Override
    public void prepare() {
        System.out.println("Prepare materials for Greek Pizza");
    }
}
