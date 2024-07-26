package behaviourPattern.state;

/**
 * 奖品发放完毕的状态, 代表着activity的生命周期结束
 * @author xueshuo
 * @create 2023-11-15 4:39 pm
 */
public class DispenseOutState extends State{
    RaffleActivity activity;

    public DispenseOutState(RaffleActivity activity) {
        this.activity = activity;
    }

    @Override
    public void deductMoney() {
        System.out.println("奖品发送完了, 请下次参加");
        System.exit(0);
    }

    @Override
    public boolean raffle() {
        System.out.println("奖品发送完了, 请下次参加");
        System.exit(0);
        return false;
    }

    @Override
    public void dispensePrize() {
        System.out.println("奖品发送完了, 请下次参加");
        System.exit(0);

    }
}
