package behaviourPattern.state.demo1_raffle.states;

import behaviourPattern.state.demo1_raffle.RaffleActivity;

import java.util.Random;

/**
 * 可以抽奖的状态
 * @author xueshuo
 * @create 2023-11-15 4:27 pm
 */
public class CanRaffleState extends State {
    RaffleActivity activity;

    public CanRaffleState(RaffleActivity activity) {
        this.activity = activity;
    }


    @Override
    public void deductMoney() {
        System.out.println("已经扣过了积分");
    }

    // 在当前状态下, 可以抽奖了, 根据抽奖结果navigate到对应状态
    @Override
    public boolean raffle() {
        System.out.println("正在抽奖, 请稍等!");
        Random r = new Random();
        int num = r.nextInt(10);
        // 10% 中奖机会
        if(num == 0){
            activity.setState(activity.getDispenseState());
            return true;
        } else {
            System.out.println("很遗憾没有抽中奖品!");
            //改变状态为不能抽奖
            activity.setState(activity.getNoRaffleState());
            return false;
        }

    }

    @Override
    public void dispensePrize() {
        System.out.println("没中奖, 不能发放奖品!");
    }
}
