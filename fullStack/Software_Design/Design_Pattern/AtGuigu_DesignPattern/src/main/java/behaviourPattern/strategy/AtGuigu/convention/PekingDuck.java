package behaviourPattern.strategy.AtGuigu.convention;

/**
 * @author xueshuo
 * @create 2023-04-29 10:08 pm
 */
public class PekingDuck extends Duck{

    @Override
    public void display() {
        System.out.println("this is a peking duck");
    }


    // 因为Peking Duck不能飞, 和父类不一致, 所以需要重写fly()
    @Override
    public void fly() {
        System.out.println("Peking duck cannot fly");
    }
}
