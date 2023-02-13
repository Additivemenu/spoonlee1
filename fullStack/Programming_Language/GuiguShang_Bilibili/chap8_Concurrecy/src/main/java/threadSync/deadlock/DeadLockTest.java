package threadSync.deadlock;

/**
 * 演示线程死锁问题
 * 1. 死锁的理解: 不同的线程分别占用对方需要的同步资源不放弃，都在等待对方放弃 自己需要的同步资源，就形成了线程的死锁
 *
 * 2. 说明:
 * 1) 出现死锁后，不会出现异常，不会出现提示，只是所有的线程都处于 阻塞状态，无法继续
 * 2) 我们使用线程同步时, 要避免出现死锁
 *
 * @author xueshuo
 * @create 2023-02-13 10:15 am
 */
public class DeadLockTest {
    public static void main(String[] args) {
        StringBuffer s1 = new StringBuffer();
        StringBuffer s2 = new StringBuffer();

        // 继承的方式
        new Thread(){
            @Override
            public void run(){
                synchronized (s1){
                    s1.append("a");
                    s2.append("1");

                    // 线程1sleep期间, 线程2可能开始执行了, 当二者结束sleep时可能出现:
                    // 线程1 拿着 s1锁, 等着s2锁被释放
                    // 线程2 拿着 s2锁, 等着s1锁被释放
                    // ---> 出现死锁了
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    synchronized (s2){
                        s1.append("b");
                        s2.append("2");

                        System.out.println(s1);
                        System.out.println(s2);
                    }
                }
            }
        }.start();

        // 实现的方式
        new Thread(new Runnable() {
            @Override
            public void run() {

                synchronized (s2){
                    s1.append("c");
                    s2.append("3");

                    // 线程1sleep期间, 线程2可能开始执行了, 当二者结束sleep时可能出现:
                    // 线程1 拿着 s1锁, 等着s2锁被释放
                    // 线程2 拿着 s2锁, 等着s1锁被释放
                    // ---> 出现死锁了
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    synchronized (s1){
                        s1.append("d");
                        s2.append("4");

                        System.out.println(s1);
                        System.out.println(s2);
                    }
                }
            }
        }).start();


    }
}
