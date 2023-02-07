package Practice2;

/**
 * 421
 * 创建3个窗口卖票, 总票数为100张, 使用继承Thread类的方式来创建线程
 * @author xueshuo
 * @create 2023-02-06 10:09 am
 */
public class WindowTest {
    public static void main(String[] args) {
        Window w1 = new Window();
        Window w2 = new Window();
        Window w3 = new Window();

        w1.setName("w1");
        w2.setName("w2");
        w3.setName("w3");


        // 仍然有问题, 存在重票
        // 需要线程安全的知识来解决, 待解决
        w1.start();
        w2.start();
        w3.start();
    }

}

class Window extends Thread{
    private static int ticket = 100;

    @Override
    public void run(){
        while(true){
            if(ticket > 0){
                System.out.println(Thread.currentThread().getName() + ": sell ticket, ticket index is: " + ticket);
                ticket --;
            }else{
                break;
            }
        }
    }
}
