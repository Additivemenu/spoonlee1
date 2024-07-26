package jdk5_new_thread;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

/**
 * 442
 * 创建线程的方式三: 实现Callable接口 --- JDK 5.0 新增
 *  如何理解实现Callable接口创建多线程比实现Runnable接口创建多线程要强大?
 *  1. call() 可以有返回值
 *  2. call() 可以抛出异常， 被外面的操作捕获, 获取异常信息
 *  3. Callable是支持generics的
 *
 * @author xueshuo
 * @create 2023-03-01 12:31 pm
 */
public class ThreadNew {

    public static void main(String[] args) {
        // 3. 创建Callable接口实现类的对象
        NumThread numThread = new NumThread();

        // 4. 将此Callable接口实现类的对象作为参数传递到FutureTask的构造器中，创建FutureTask的对象
        FutureTask futureTask = new FutureTask(numThread);

        // 5. 将futureTask对象作为参数传递到THread类的构造器中, 创建Thread对象, 并调用start()启动线程任务
        Thread t1 = new Thread(futureTask);     // FutureTask也实现了Runnable
        t1.start();     // 执行线程任务

        // 6. 获取Callable中call方法的返回值 (如果不感兴趣就可以不用调用 futureTask.get())
        try {
            // get 方法的返回值即为FutureTask构造器参数Callable实现类重写的call()的返回值
            Object sum = futureTask.get();
            System.out.println("sum is " + sum);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }


}

// 1. 提供一个实现了Callable接口的实现类
class NumThread implements Callable{
    // 2. 实现call方法, 将此线程需要执行的操作声明在call() 中
    @Override
    public Object call() throws Exception {
        int sum = 0;

        // 遍历100以内的偶数, 返回他们的和
        for(int i = 1; i <= 100; i++){
            if (i % 2 == 0){
                System.out.println(i);
                sum += i;
            }
        }

        return sum;
    }


}










