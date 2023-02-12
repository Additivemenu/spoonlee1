package threadSync.extend;

/**
 * 434 利用同步方法解决使用继承方式创建线程的线程安全问题
 * @author xueshuo
 * @create 2023-02-12 10:39 pm
 */
public class WindowTest2 {
    public static void main(String[] args) {
        Window2 w1 = new Window2();
        Window2 w2 = new Window2();
        Window2 w3 = new Window2();

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

class Window2 extends Thread{
    private static int ticket = 100;

    @Override
    public void run(){
        while(true){

            show();

        }
    }

    private static synchronized void show(){        // 锁是: 当前类 Window2.class
        // private synchronized void show(){           // 锁是 this, 在main()对应t1,t2,t3并不唯一, 此种解决方式依然存在线程安全问题
            if (ticket > 0) {

            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println(Thread.currentThread().getName() + ": sell ticket, ticket index is: " + ticket);
            ticket--;
        }
    }

}
