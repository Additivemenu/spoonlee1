package threadCommuncation;

/**
 * P439
 * 线程通信的例子: 使用两个线程打印1 ~ 100, 要求两个线程交替打印
 *
 * 涉及到的三个方法:
 * wait(): 一旦执行此方法, 当前线程就进入阻塞状态, 并释放同步监视器
 * notify():  一旦执行此方法, 就会唤醒被wait()的一个线程, 如果有多个线程被wait， 就唤醒优先级高的那个
 * notifyAll(): 一旦执行此方法, 就会唤醒所有被wait的线程
 *
 * 说明:
 * 1. wait(), notify(), notifyAll() 三个方法必须使用在同步代码块或同步方法中 (Lock使用线程通信有别的方式)
 * 2. wait(), notify(), notifyAll() 三个方法的调用者必须是同步代码块或同步方法中的同步监视器, 否则会出现IllegalMonitorStateException
 * 3.  wait(), notify(), notifyAll() 三个方法是定义在java.lang.object中, 因为任何类的对象都可以充当同步监视器
 *
 * @author xueshuo
 * @create 2023-02-25 5:06 pm
 */
public class CommunicationTest {

    public static void main(String[] args) {
        Number number = new Number();

        Thread t1 = new Thread(number);
        Thread t2 = new Thread(number);

        t1.setName("t1");
        t2.setName("t2");

        t1.start();
        t2.start();

    }
}


class Number implements Runnable{
    private int number = 1;


    @Override
    public void run() {

        synchronized (this) {

            while(true){
                // 唤醒线程
                notify();       // 唤醒其他处于阻塞状态的1个线程, 优先级越高越先被唤醒

                if(number <= 100){

                    try {
                        Thread.sleep(10);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println(Thread.currentThread().getName() + ": "+ number);
                    number++;

                    try {
                        // 使得调用如下wait()方法的线程进入阻塞状态
                        // 执行wait()的线程会释放拿到的锁, 但s执行sleep()的线程不会释放拿到的锁
                        wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                }else{
                    break;
                }
            }
        }
    }
}
