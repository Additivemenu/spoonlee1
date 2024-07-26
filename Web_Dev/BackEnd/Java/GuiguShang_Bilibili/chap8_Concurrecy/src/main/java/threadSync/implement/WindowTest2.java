package threadSync.implement;

/**
 * 433 使用同步方法解决实现Runnable接口的线程安全问题
 * @author xueshuo
 * @create 2023-02-12 10:27 pm
 */
public class WindowTest2 {

    public static void main(String[] args) {
        Window2 w2 = new Window2(); // w1只对应1个ticket, 1 个 obj锁

        Thread t1 = new Thread(w2);
        t1.setName("Window1");
        Thread t2 = new Thread(w2);
        t2.setName("Window2");
        Thread t3 = new Thread(w2);
        t3.setName("Window3");

        // Window1中的ticket不需要写成static的, t1, t2, t3也能共享100张票, 因为只有1个实现了Runnable接口的类的对象 w1
        // 即三个线程共同来操作一个实现了Runnable接口的类的对象. 刀 ---> Thread,  鱼 ---> 实现了Runnable的对象
        t1.start();
        t2.start();
        t3.start();

    }
}


class Window2 implements Runnable{

    private int ticket = 100;       // 用实现的方式创建thread不用写static
    Object obj = new Object();      // 充当锁, 写在这里为了保证多个对Window1实例进行操作的线程共享同一把锁

    @Override
    public void run(){
        while(true){

            show();
        }
    }

    // 同步方法
    private synchronized void show(){       // 锁: this
        if (ticket > 0) {

            try {
                // sleep()导致的线程阻塞 大大提高了引起错票的概率: ticket = -1 or 0; sleep时间越长, 错票概率越高
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println(Thread.currentThread().getName() + ": sell ticket, ticket index: " + ticket);
            ticket--;
        }
    }


}
