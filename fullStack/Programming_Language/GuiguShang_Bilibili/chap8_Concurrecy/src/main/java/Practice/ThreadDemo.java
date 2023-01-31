package Practice;

/**
 * 418
 * 练习: 创建两个分线程, 其中一个线程遍历100以内的偶数, 另一个遍历100以内的奇数
 *
 * @author xueshuo
 * @create 2023-01-31 5:47 pm
 */
public class ThreadDemo {
    public static void main(String[] args) {
//        // 方式1
//        MyThread1 t1 = new MyThread1();
//        MyThread2 t2 = new MyThread2();
//        t1.start();
//        t2.start();

        // 方式2: 创建thread的匿名子类, 然后调用start()
        new Thread(){
            @Override
            public void run(){
                // // 遍历打印100以内的偶数
                for(int i=0; i < 100; i++){
                    if (i % 2 == 0) {
                        System.out.println(Thread.currentThread().getName() + ": " + i);
                    }
                }
            }
        }.start();

        new Thread(){
            @Override
            public void run(){
                // // 遍历打印100以内的偶数
                for(int i=0; i < 100; i++){
                    if (i % 2 != 0) {
                        System.out.println(Thread.currentThread().getName() + ": " + i);
                    }
                }
            }
        }.start();

    }

}


class MyThread1 extends Thread{
    @Override
    public void run(){
        // // 遍历打印100以内的偶数
        for(int i=0; i < 100; i++){
            if (i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }
        }
    }
}

class MyThread2 extends Thread{
    @Override
    public void run(){
        // 遍历打印100以内的奇数
        for(int i=0; i < 100; i++){
            if (i % 2 != 0) {
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }
        }
    }
}



