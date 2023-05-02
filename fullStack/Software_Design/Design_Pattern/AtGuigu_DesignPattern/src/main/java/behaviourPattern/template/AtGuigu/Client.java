package behaviourPattern.template.AtGuigu;

/**
 * @author xueshuo
 * @create 2023-05-02 10:44 pm
 */
public class Client {
    public static void main(String[] args) {
        // 制作红豆豆浆
        System.out.println("制作红豆豆浆");
        SoyaMilk redBeanSoyMilk = new RedBeanSoyMilk();
        redBeanSoyMilk.make();

        System.out.println("制作花生豆浆");
        SoyaMilk peanutSoyMilk = new PeanutSoyMilk();
        peanutSoyMilk.make();
    }
}
