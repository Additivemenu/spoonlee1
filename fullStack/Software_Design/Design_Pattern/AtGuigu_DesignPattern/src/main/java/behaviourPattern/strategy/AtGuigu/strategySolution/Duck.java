package behaviourPattern.strategy.AtGuigu.strategySolution;

import behaviourPattern.strategy.AtGuigu.strategySolution.fly.FlyBehaviour;

/**
 * @author xueshuo
 * @create 2023-04-29 10:06 pm
 */
public abstract class Duck {

    // 属性, 策略接口
    FlyBehaviour flyBehaviour;

    public void setFlyBehaviour(FlyBehaviour flyBehaviour) {
        this.flyBehaviour = flyBehaviour;
    }

    public Duck(){
    }

    public abstract void display();     // 显示鸭子信息


    public void fly(){
        if(flyBehaviour != null) {
            flyBehaviour.fly();
        }
    }

}
