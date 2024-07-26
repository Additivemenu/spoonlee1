package behaviourPattern.strategy.AtGuigu.strategySolution.fly;

/**
 * @author xueshuo
 * @create 2023-04-30 8:12 am
 */
public class NoFlyBehaviour implements FlyBehaviour{
    @Override
    public void fly() {
        System.out.println("cannot fly");
    }
}
