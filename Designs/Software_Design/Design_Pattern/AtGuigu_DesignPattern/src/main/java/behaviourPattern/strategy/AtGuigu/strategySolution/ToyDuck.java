package behaviourPattern.strategy.AtGuigu.strategySolution;

import behaviourPattern.strategy.AtGuigu.strategySolution.fly.NoFlyBehaviour;

/**
 * @author xueshuo
 * @create 2023-04-29 10:09 pm
 */
public class ToyDuck extends Duck {

    public ToyDuck() {
        flyBehaviour = new NoFlyBehaviour();
    }

    @Override
    public void display() {
        System.out.println("this is toy duck");
    }


}
