package behaviourPattern.strategy.AtGuigu.strategySolution;

import behaviourPattern.strategy.AtGuigu.strategySolution.fly.BadFlyBehaviour;
import behaviourPattern.strategy.AtGuigu.strategySolution.fly.NoFlyBehaviour;

/**
 * @author xueshuo
 * @create 2023-04-29 10:08 pm
 */
public class PekingDuck extends Duck {

    public PekingDuck() {
        flyBehaviour = new BadFlyBehaviour();
    }

    @Override
    public void display() {
        System.out.println("this is a peking duck");
    }


}
