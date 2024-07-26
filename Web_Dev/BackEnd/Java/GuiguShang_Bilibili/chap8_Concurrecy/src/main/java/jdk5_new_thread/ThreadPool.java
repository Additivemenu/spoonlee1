package jdk5_new_thread;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 创建线程的方式之四: 使用线程池
 *
 * 好处:
 * 1. 提高响应速度(减少了创建新线程的时间)
 * 2. 降低资源消耗(重复利用线程池中线程，不需要每次都创建)
 * 3. 便于线程管理, 可以控制:
 * 	     + corePoolSize:核心池的大小
 *  	 + maximumPoolSize:最大线程数
 *  	 + keepAliveTime:线程没有任务时最多保持多长时间后会终止
 *       + ...
 *
 * @author xueshuo
 * @create 2023-03-02 8:59 am
 */
public class ThreadPool {

    public static void main(String[] args) {
        // 1. 利用Executors工具类生成含有指定线程数量的线程池
        ExecutorService executorService = Executors.newFixedThreadPool(10);
        // System.out.println(executorService.getClass());     // 查看executorService的类

//        // optional: 设置线程池属性 方便管理
//        ThreadPoolExecutor service1 = (ThreadPoolExecutor) executorService;
//        service1.setCorePoolSize(15);
//        service1.setKeepAliveTime(5, TimeUnit.SECONDS);


        // 2. 执行指定的线程操作, 需要提供实现了RUnnable接口或Callable接口实现类的对象
        executorService.execute(new NumberThread());      // 适合适用于Runnable
        executorService.execute(new NumberThread1());      // 适合适用于Runnable

        //executorService.submit(Callable callable);  // 适合使用于Callable

        // 3. 关闭线程池
        executorService.shutdown();
    }
}


class NumberThread implements Runnable {

    @Override
    public void run() {
        for(int i=1; i<=100;i++){
            if (i % 2 == 0){
                System.out.println(Thread.currentThread().getName()+": "+ i);
            }
        }
    }
}

class NumberThread1 implements Runnable {

    @Override
    public void run() {
        for(int i=1; i<=100;i++){
            if (i % 2 != 0){
                System.out.println(Thread.currentThread().getName()+": "+ i);
            }
        }
    }
}
