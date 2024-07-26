/**
 *
 * 422
 * 创建多线程的方式2: 实现Runnable接口
 * 1. 创建实现了Runnable接口的类
 * 2. 实现类去实现Runnable中的抽象方法 run()
 * 3. 创建实现类的对象
 * 4. 将此对象作为参数传递到Thread类的构造器, 创建Thread类的对象
 * 5. 通过Thread类的对象, 调用start()
 *
 * 424
 * 比较创建线程的两种方式
 *  开发中优先选择: 方式二 实现了Runnable接口的方式来创建线程
 *  原因: 1. 实现的方式没有类的单继承性的局限性
 *       2. 实现的方式更适合来处理多个线程有共享数据的情况
 *
 *  联系: public class Thread implements Runnable, Thread类其实也实现了Runnable接口
 *
 *  相同点: 两种方式其实本质都需要重写Runnable接口中的run(), 将线程要执行的逻辑声明在run()中
 *
 *
 * @author xueshuo
 * @create 2023-02-07 4:50 pm
 */
public class ThreadTest2 {
    public static void main(String[] args) {
        // step3 创建实现类的对象
        MThread mThread = new MThread();
        // step4 将此对象作为参数传递到Thread类的构造器, 创建Thread类的对象
        Thread t1= new Thread(mThread);
        t1.setName("thread 1");
        // step5 通过Thread类的对象, 调用start()
        t1.start();     // 启动线程, 调用当前线程的run() ---> 当前线程的run()调用了Runnable类型的target的run()

        // 再启动一个线程, 遍历100以内的偶数
        Thread t2 = new Thread(mThread);
        t2.setName("thread 2");
        t2.start();
    }


}

// step 1, 2
class MThread implements Runnable{
    @Override
    public void run(){
        for (int i = 0; i < 100; i++) {
            if(i % 2 == 0){
                System.out.println(Thread.currentThread().getName()+ ": "+ i);
            }

        }
    }
}
