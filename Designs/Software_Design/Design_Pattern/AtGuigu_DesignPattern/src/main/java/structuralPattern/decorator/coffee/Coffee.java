package structuralPattern.decorator.coffee;

/**
 * @author xueshuo
 * @create 2023-04-18 1:30 pm
 */
public class Coffee extends Drink{
    @Override
    public float cost() {
        return super.getPrice();
    }
}
