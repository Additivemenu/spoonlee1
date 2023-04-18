package structuralPattern.decorator.coffee;

/**
 * @author xueshuo
 * @create 2023-04-18 1:43 pm
 */
public class Soy extends  Decorator{
    public Soy(Drink obj) {
        super(obj);
        setDescription("Soy");
        setPrice(1.5f);
    }
}
