package behaviourPattern.strategy.AtGuigu.strategySolution.fly;

/**
 * @author xueshuo
 * @create 2023-04-30 8:11 am
 */
public class BadFlyBehaviour implements FlyBehaviour{

    @Override
    public void fly() {
        System.out.println("bad fly behaviour");
    }
}
