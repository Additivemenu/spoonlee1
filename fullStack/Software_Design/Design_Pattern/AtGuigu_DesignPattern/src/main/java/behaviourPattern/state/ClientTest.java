package behaviourPattern.state;

/**
 * @author xueshuo
 * @create 2023-11-15 4:52 pm
 */
public class ClientTest {
    public static void main(String[] args) {
        RaffleActivity activity = new RaffleActivity(1);

        for (int i = 0; i< 30; i++){
            System.out.println("---------------第" + (i+1)+ "次抽奖------------------");

            // 参加抽奖, 第一次先扣积分
            activity.deductMoney();
            // 第二部抽奖
            activity.raffle();

            System.out.println("剩余奖品数: " + activity.getCount());
        }
    }
}
