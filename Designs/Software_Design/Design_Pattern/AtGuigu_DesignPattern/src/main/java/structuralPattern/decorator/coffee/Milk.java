package structuralPattern.decorator.coffee;

/**
 * @author xueshuo
 * @create 2023-04-18 1:42 pm
 */
public class Milk extends Decorator{
    public Milk(Drink obj) {
        super(obj);
        setDescription("Milk");
        setPrice(2.0f);
    }
}
