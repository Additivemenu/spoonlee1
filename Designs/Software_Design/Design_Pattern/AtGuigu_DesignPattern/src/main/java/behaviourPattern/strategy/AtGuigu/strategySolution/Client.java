package behaviourPattern.strategy.AtGuigu.strategySolution;

import behaviourPattern.strategy.AtGuigu.strategySolution.fly.NoFlyBehaviour;

/**
 * @author xueshuo
 * @create 2023-04-29 10:15 pm
 */
public class Client {
    public static void main(String[] args) {
        WildDuck wildDuck = new WildDuck();
        wildDuck.fly();

        ToyDuck toyDuck = new ToyDuck();
        toyDuck.fly();

        PekingDuck pekingDuck = new PekingDuck();
        pekingDuck.fly();

        // 动态改变某个对象的行为, 北京鸭不能飞
        pekingDuck.setFlyBehaviour(new NoFlyBehaviour());
        System.out.println("Peking duck's real fly behaviour: ");
        pekingDuck.fly();
    }
}
