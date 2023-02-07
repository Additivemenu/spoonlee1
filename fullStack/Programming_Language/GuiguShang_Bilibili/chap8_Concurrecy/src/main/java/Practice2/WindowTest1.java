package Practice2;

/**
 * 423
 * 创建3个窗口卖票, 总票数为100张, 使用实现Runnable接口的方式创建线程
 *
 * 依然存在重票问题, 即线程安全问题, 待解决
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

    private int ticket = 100;       // 不写static

    @Override
    public void run(){
        while(true){
            if(ticket > 0){
                System.out.println(Thread.currentThread().getName() + ": sell ticket, ticket index: "+ ticket);
                ticket--;
            } else{
                break;
            }
        }
    }
}
