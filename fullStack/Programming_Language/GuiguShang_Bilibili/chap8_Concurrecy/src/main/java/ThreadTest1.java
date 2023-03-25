/**
 * 416, 417
 *
 * 多线程的创建:
 *      方式1： 继承于thread类
 *             1. 创建一个继承于Thread类的子类
 *             2. 重写Thread类中的run() ---> 此线程要执行的操作声明在run()中
 *             3. 创建Thread类的子类对象, 通过此对象调用start()： 启动当前线程, 同时调用当前线程的run()
 *
 * @author xueshuo
 * @create 2023-01-31 5:05 pm
 */
public class ThreadTest1 {

    public static void main(String[] args) {
        // 3. create instance of MyThread in main() thread
        MyThread t1 =  new MyThread();
        t1.start(); // 使得另一个线程t1开始执行, 同时调用t1的run()

//        // ❌问题一 不能通过直接调用run()的方式启动线程
//        // 不要单独使用run(), 因为那样子它还是在main thread中运行
//        t1.run();

        // ❌问题二: 再启动一个thread, 遍历100以内的偶数 --> ❌, 不能让已经start()的thread去再次执行start()
        // 否则会throw IllegalThreadStateException
        // 有点像stream API的运作方式, 我们此时需要重新创建新的线程对象再调用start()
        MyThread t2 = new MyThread();
        t2.start();


        // 到这里, 此时有三个线程同时执行 (不考虑垃圾回收和异常): t1, t2, 主线程
        // 到这里, 到底谁先执行不确定,

        // 以下操作仍然在main thread中进行
        for(int i = 0; i < 100; i++){
            if(i % 2 != 0) {
                System.out.println(Thread.currentThread().getName() + " (main): "+ i);
            }
        }
    }

}

// 1. create a subclass of Thread
class MyThread extends Thread{
    // 2. Override run()
    @Override
    public void run(){
        // 遍历打印100以内的偶数
        for(int i = 0; i < 100; i++){
            if(i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + ": "+ i);
            }
        }
    }

}
