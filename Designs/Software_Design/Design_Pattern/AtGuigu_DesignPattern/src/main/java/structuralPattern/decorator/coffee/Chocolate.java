package structuralPattern.decorator.coffee;

/**
 * @author xueshuo
 * @create 2023-04-18 1:40 pm
 */

// concrete decorator, 即调味品
public class Chocolate extends Decorator{

    public Chocolate(Drink obj) {
        super(obj);
        setDescription("Chocolate");
        setPrice(3.0f);
    }
}
