package behaviourPattern.state.demo1_raffle;

import behaviourPattern.state.demo1_raffle.states.*;

/**
 * @author xueshuo
 * @create 2023-11-15 4:20 pm
 */
public class RaffleActivity {
    State state = null;     // pointer indicating the current state
    int count = 0;          // 表示当前奖品的数量

    // 以下4个属性, 代表4种状态
    State noRaffleState = new NoRaffleState(this);
    State canRaffleState = new CanRaffleState(this);
    State dispenseState = new DispenseState(this);
    State dispenseOutState = new DispenseOutState(this);


    public RaffleActivity(int count ) {
        this.state = getNoRaffleState();
        this.count = count;
    }

    // activity作为包在state外的类, 同一化行为
    public void deductMoney(){
        state.deductMoney();
    }


    // 抽奖
    public void raffle(){
        if(state.raffle()){
            //领取奖品
            state.dispensePrize();;
        }
    }


    // 每领取一次奖品, count--
    // 不过这么写不好, 在getter里做non-idempotetn operation
    public int getCount() {
//        int curCount = count;
//        count--;
//        return curCount;
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public State getNoRaffleState() {
        return noRaffleState;
    }

    public void setNoRaffleState(State noRaffleState) {
        this.noRaffleState = noRaffleState;
    }

    public State getCanRaffleState() {
        return canRaffleState;
    }

    public void setCanRaffleState(State canRaffleState) {
        this.canRaffleState = canRaffleState;
    }

    public State getDispenseState() {
        return dispenseState;
    }

    public void setDispenseState(State dispenseState) {
        this.dispenseState = dispenseState;
    }

    public State getDispenseOutState() {
        return dispenseOutState;
    }

    public void setDispenseOutState(State dispenseOutState) {
        this.dispenseOutState = dispenseOutState;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }
}
