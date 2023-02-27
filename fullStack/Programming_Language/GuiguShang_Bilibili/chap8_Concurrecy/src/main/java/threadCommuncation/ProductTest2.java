package threadCommuncation;

/**
 * 生产者消费者经典例题
 * 实现Runnable接口的方式
 *
 * @author xueshuo
 * @create 2023-02-27 3:49 pm
 */
public class ProductTest2 {
    public static void main(String[] args) {
        Clerk1 clerk = new Clerk1();

        Thread t1 = new Thread(clerk);
        t1.setName("Producer1");
        Thread t2 = new Thread(clerk);
        t2.setName("Consumer1");

        t1.start();
        t2.start();

    }

}


// 实例将被多个线程依赖使用
class Clerk1 implements  Runnable {

    private int productCount = 0;

    @Override
    public void run() {
        while(true){


        }
    }
}


