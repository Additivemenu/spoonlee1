package behaviourPattern.strategy.AtGuigu.strategySolution;

import behaviourPattern.strategy.AtGuigu.strategySolution.fly.GoodFlyBehaviour;

/**
 * @author xueshuo
 * @create 2023-04-29 10:07 pm
 */
public class WildDuck extends Duck {
    public WildDuck() {
        this.flyBehaviour = new GoodFlyBehaviour();
    }

    @Override
    public void display() {
        System.out.println("this is wild duck");
    }
}
