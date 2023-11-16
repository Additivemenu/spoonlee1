package behaviourPattern.state;

/**
 * 状态抽象类
 * @author xueshuo
 * @create 2023-11-15 4:15 pm
 */
public abstract class State {
    // 行为1： 扣除积分
    public abstract  void deductMoney();

    // 行为2: 是否抽中奖品
    public abstract boolean raffle();

    // 行为3: 发放奖品
    public abstract void dispensePrize();
}
