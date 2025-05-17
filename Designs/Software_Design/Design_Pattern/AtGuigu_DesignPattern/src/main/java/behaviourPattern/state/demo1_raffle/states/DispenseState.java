package behaviourPattern.state.demo1_raffle.states;

import behaviourPattern.state.demo1_raffle.RaffleActivity;

/**
 * 发放奖品的状态
 * @author xueshuo
 * @create 2023-11-15 4:33 pm
 */
public class DispenseState extends State{
    RaffleActivity activity;

    public DispenseState(RaffleActivity activity) {
        this.activity = activity;
    }


    @Override
    public void deductMoney() {
        System.out.println("不能扣除积分");
    }

    @Override
    public boolean raffle() {
        System.out.println("不能抽奖");
        return false;
    }

    @Override
    public void dispensePrize() {
        if(activity.getCount() > 0){
            System.out.println("恭喜中奖了! 扣除1个奖品库存");
            activity.setCount(activity.getCount()-1);
            // 改变状态为不能抽奖
            activity.setState(activity.getNoRaffleState());
        } else {
            System.out.println("恭喜中奖, 但奖品库存现在为0, 很遗憾, 奖品发放完了");
            // 改变状态为奖品发送完毕, 后面activity声明周期结束
            activity.setState(activity.getDispenseOutState());
        }

    }
}
