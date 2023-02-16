package threadSync.jdk5_lock;

import java.util.concurrent.locks.ReentrantLock;

/**
 * 解决线程安全问题的方式三: Lock --- JDK5.0新增
 *
 * 1. 面试题: synchronized 与 Lock方式的异同?
 * 同: 都可解决线程安全问题
 *
 * 异: synchronized 方法和代码块 在执行完相应的同步代码后自动释放同步监视器,
 *     而Lock则需要 手动启动同步检测器(lock()) 手动释放同步监视器(unlock())
 *
 *
 *
 * @author xueshuo
 * @create 2023-02-17 1:40 am
 */

class Window implements Runnable {
    private int ticket = 100;

    // step1: instantiate lock
    private ReentrantLock lock = new ReentrantLock(true);       // 构造器参数如果是true, 则实例化一个'fair' lock, 让等待的线程先进先出(进入队列), 不至于老是同一个线程抢到cpu的执行权

    @Override
    public void run(){
        while(true){

            try {

                // step2: 调用lock()方法, 从这里开始就保证线程上锁了
                lock.lock();

                if(ticket > 0){

                    // 增大线程安全问题出现概率
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println(Thread.currentThread().getName() + ": sell ticket, ticket index is "+ ticket);
                    ticket --;
                }else{
                    break;
                }
            } finally {
                // step3: 调用unlock(), release lock
                lock.unlock();
            }
        }
    }
}

public class LockTest {
    public static void main(String[] args) {
        Window w = new Window();
        Thread t1 = new Thread(w);
        Thread t2 = new Thread(w);
        Thread t3 = new Thread(w);

        t1.setName("window1");
        t2.setName("window2");
        t3.setName("window3");

        t1.start();
        t2.start();
        t3.start();
    }


}
