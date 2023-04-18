package structuralPattern.decorator.coffee;

/**
 * @author xueshuo
 * @create 2023-04-18 1:35 pm
 */
public class Decorator extends Drink{
    private Drink obj;      // 被装饰者

    public Decorator(Drink obj) {           // 组合关系
        this.obj = obj;
    }

    @Override
    public float cost() {
        // 自己的价格 + 被装饰者的总体价格
        return super.getPrice() + obj.cost();
    }

    @Override
    public String getDescription(){

        return super.getDescription() +" "+ super.getPrice() + " && " + obj.getDescription();
    }
}
