package behaviourPattern.state;

/**
 * 不能抽奖的状态
 * @author xueshuo
 * @create 2023-11-15 4:19 pm
 */
public class NoRaffleState extends State{

    // 初始化时传入活动引用, 扣除积分后改变其状态
    RaffleActivity activity;

    public NoRaffleState(RaffleActivity activity) {
        this.activity = activity;
    }

    // 当前状态可以扣除积分, 扣除后将状态设置成可以抽奖的状态
    @Override
    public void deductMoney() {
        System.out.println("扣除50积分成功, 您可以抽奖了");
        activity.setState(activity.getCanRaffleState());            // navigate to other state

    }

    // 当前状态不能抽奖
    @Override
    public boolean raffle() {
        System.out.println("扣了积分才能抽奖哦!");
        return false;
    }

    // 当前状态不能发奖品
    @Override
    public void dispensePrize() {
        System.out.println("不能发放奖品");
    }
}
