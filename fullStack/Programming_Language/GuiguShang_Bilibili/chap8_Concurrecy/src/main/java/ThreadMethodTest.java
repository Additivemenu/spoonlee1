/**
 * 419
 * 测试Thread中的常用方法
 * 1. start(): 启动当前线程, 并调用当前线程的run()
 * 2. run():  通常需要重写Thread类中的此方法, 将创建的线程要执行的操作声明在此方法中
 * 3. currentThread(): 返回执行当前代码的线程对象
 * 4. getName(): 获取当前线程的名字
 * 5. setName(): 设置当前线程的名字 (也可通过构造器起名字)
 * 6. yield(): 释放当前线程的cpu的执行权 (但是下一刻其实cpu执行权也可能又被分配到本线程 ),
 *             即线程让步 暂停正在执行的线程, 把执行的机会让给优先级相同或更高的线程
 * 7. join(): 在线程a中调用线程b的join(),  此时线程a进入阻塞状态, 直到线程b完全执行完之后, 线程a才结束阻塞状态
 * 8. stop(): deprecated. 当执行此方法时, 强制结束当前线程. 不推荐使用
 * 9. sleep(long millitime): 让当前线程"睡眠"(阻塞)指定的millitime毫秒. 在指定的millitime毫秒时间内， 当前线程是阻塞状态.
 * 10. isAlive(): 判断当前线程是否存活
 *
 *
 * 测试Thread类中的常用方法
 * @author xueshuo
 * @create 2023-01-31 10:11 pm
 */
public class ThreadMethodTest {
    public static void main(String[] args) {
        HelloThread h1 = new HelloThread("Thread: 1");
        h1.setName("xueshuo's Thread");
        h1.start();

        // 给主线程命名
        Thread.currentThread().setName("main Thread");
        for(int i = 0; i < 100; i++){
            if(i % 2 == 0){
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }

            if(i == 20){
                try {
                    h1.join();      // 此时h1 cut in 切入, h1 执行完了之后, 才会继续main thread的剩余操作
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

        }

        System.out.println(h1.isAlive());   // false

    }

}

class HelloThread extends Thread{
    @Override
    public void run(){
        for(int i = 0; i < 100; i++){
            if(i % 2 == 0){

                // 注意这里只能try-catch. 不能throw exception
                // 因为父类Thread的run()方法就没有throw exception; OOP: 子类不可以throw比父类范围更大的Exception
                try {
                    sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                System.out.println(Thread.currentThread().getName() + ": " + i);
            }

            if(i % 20 == 0) {
                this.yield();
            }
        }
    }

    public HelloThread(String name){
        super(name);
    }

}
