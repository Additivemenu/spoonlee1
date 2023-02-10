package threadSync;

/**
 * 430 线程安全问题举例与解决措施
 * 创建3个窗口卖票, 总票数为100张, 使用实现Runnable接口的方式创建线程
 *
 * 1. 问题: 卖票过程中出现重票与错票 ---> 出现了线程安全问题
 * 2. 问题出现的原因: 当某个线程来操作车票数(共享数据)的过程中, 尚未完成时其他线程参与了进来也对车票数(车票数)进行操作
 * 3. 如何解决: 当一个线程a在操作车票数(共享数据)时, 其他线程不能参与进来, 直到线程a操作完车票数时, 其他线程才可以开始操作ticket.
 *              这种情况下， 即使线程a出现了阻塞, 也不能改变
 *
 *
 * @author xueshuo
 * @create 2023-02-07 5:05 pm
 */
public class WindowTest1 {

    public static void main(String[] args) {
        Window1 w1 = new Window1();

        Thread t1 = new Thread(w1);
        t1.setName("Window1");
        Thread t2 = new Thread(w1);
        t2.setName("Window2");
        Thread t3 = new Thread(w1);
        t3.setName("Window3");

        // Window1中的ticket不需要写成static的, t1, t2, t3也能共享100张票, 因为只有1个实现了Runnable接口的类的对象 w1
        // 即三个线程共同来操作一个实现了Runnable接口的类的对象. 刀 ---> Thread,  鱼 ---> 实现了Runnable的对象
        t1.start();
        t2.start();
        t3.start();

    }
}


class Window1 implements Runnable{

    private int ticket = 100;       // 用实现的方式创建thread不用写static

    @Override
    public void run(){
        while(true){
            if(ticket > 0){

                try {
                    // sleep()导致的线程阻塞 大大提高了引起错票的概率: ticket = -1 or 0; sleep时间越长, 错票概率越高
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                System.out.println(Thread.currentThread().getName() + ": sell ticket, ticket index: "+ ticket);

                ticket--;
            } else{
                break;
            }
        }
    }
}
