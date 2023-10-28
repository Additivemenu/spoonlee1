package threadSync.implement;

/**
 * 430 线程安全问题举例与解决措施
 * 创建3个窗口卖票, 总票数为100张, 使用实现Runnable接口的方式创建线程
 *
 * 1. 问题: 卖票过程中出现重票与错票 ---> 出现了线程安全问题
 * 2. 问题出现的原因: 当某个线程来操作车票数(共享数据)的过程中, 尚未完成时其他线程参与了进来也对车票数(车票数)进行操作
 * 3. 如何解决: 当一个线程a在操作车票数(共享数据)时, 其他线程不能参与进来, 直到线程a操作完车票数时, 其他线程才可以开始操作ticket.
 *              这种情况下， 即使线程a出现了阻塞, 也不能改变
 * 4. Java中, 我们通过同步机制, 来解决线程安全问题
 *      方式一: 同步代码块
 *          synchronized(同步监视器){
 *              // 需要被同步的代码
 *          }
 *          说明: 操作共享数据的代码, 即为需要被同步的代码   ---> 不能包含代码多了, 也不能包含代码少了
 *               共享数据: 多个线程共同操作的变量. 比如: ticket就是共享数据
 *               同步监视器, 俗称: 锁. 任何一个类的对象都可以充当锁
 *                  要求: 多个线程必须要共用同一把锁
 *                  补充: 在实现Runnable接口创建多线程的方式中, 我们可以考虑用this充当锁
 *
 *
 *      方式二: 同步方法
 *        如果操作共享数据的代码完整的声明在一个方法中, 我们不妨将此方法声明为synchronized
 *        1. 同步方法仍然涉及到同步监视器(锁), 只是不需要我们显式地声明
 *        2. 非静态的同步方法, 同步监视器是: this
 *        3. 静态的同步方法, 同步监视器是: 当前类本身
 *
 *
 *  5. 同步的方式, 解决了线程的安全问题. --- 好处
 *     操作同步代码时， 只能有1个线程参与, 其他线程等待, 相当于是1个单线程的过程. ---局限性
 * @author xueshuo
 * @create 2023-02-07 5:05 pm
 */
public class WindowTest1 {

    public static void main(String[] args) {
        Window1 w1 = new Window1(); // w1只对应1个ticket, 1 个 obj锁

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
    Object obj = new Object();      // 充当锁, 写在这里为了保证多个对Window1实例进行操作的线程共享同一把锁

    @Override
    public void run(){
        while(true){
            // any incoming threads attempting to exe the code block below will be stopped here until the lock is released
            // -------------------------------------------------------------------------------
            // 方式一: 用this来充当锁
            synchronized (this) {        // 方式二: 用另外的obj充当锁 synchronized (obj) {
                if (ticket > 0) {

                    try {
                        // sleep()导致的线程阻塞 大大提高了引起错票的概率: ticket = -1 or 0; sleep时间越长, 错票概率越高
                        Thread.sleep(300);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println(Thread.currentThread().getName() + ": sell ticket, ticket index: " + ticket);

                    ticket--;
                } else {
                    break;
                }
            }
            // -------------------------------------------------------------------------------
        }
    }
}
