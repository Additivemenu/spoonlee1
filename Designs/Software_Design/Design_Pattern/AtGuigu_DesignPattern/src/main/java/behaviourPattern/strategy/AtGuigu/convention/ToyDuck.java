package behaviourPattern.strategy.AtGuigu.convention;

/**
 * @author xueshuo
 * @create 2023-04-29 10:09 pm
 */
public class ToyDuck extends Duck{

    @Override
    public void display() {
        System.out.println("this is toy duck");
    }

    // 玩具鸭不能叫， swim, fly, 需要重写父类的全部方法
    @Override
    public void quack(){
        System.out.println("鸭子嘎嘎叫");
    }

    @Override
    public void swim(){
        System.out.println("鸭子会游泳");
    }


    @Override
    public void fly(){
        System.out.println("鸭子会飞～");
    }
}
