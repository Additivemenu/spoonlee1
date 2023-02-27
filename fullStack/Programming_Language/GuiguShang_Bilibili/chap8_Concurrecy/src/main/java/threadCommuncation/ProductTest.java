package threadCommuncation;

/**
 * 441
 * 线程通信的应用: 生产者/消费者问题
 *
 * 生产者(Productor)将产品交给店员(Clerk)，而消费者(Customer)从店员处 取走产品，店员一次只能持有固定数量的产品(比如:20)，如果生产者试图
 * 生产更多的产品，店员会叫生产者停一下，如果店中有空位放产品了再通 知生产者继续生产;如果店中没有产品了，店员会告诉消费者等一下，如 果店中有产品
 * 了再通知消费者来取走产品。
 *
 * 分析:
 * 1. 是否是多线程问题? 是, 存在生产者线程, 消费者线程
 * 2. 是否有线程安全问题 ---> 是否有共享数据? 有, 店员(或产品数量)
 * 3. 如何解决线程的安全问题? 同步机制--3种方法 (同步代码块， 同步方法, Lock)
 * 4. 是否涉及到线程通信? 是,
 *
 * @author xueshuo
 * @create 2023-02-27 2:58 pm
 */
public class ProductTest {

    public static void main(String[] args) {
        Clerk clerk = new Clerk();

        Producer p1 = new Producer(clerk);
        p1.setName("Producer1");

        Consumer c1 = new Consumer(clerk);
        c1.setName("Consumer1");

        Consumer c2 = new Consumer(clerk);
        c2.setName("Consumer2");

        p1.start();
        c1.start();
        c2.start();
    }

}


class Clerk{

    private int productCount = 0;

    // 生产产品
    public synchronized   void produceProduct(){        // 同步监视器是this

        if (productCount < 20 ){
            productCount++;
            System.out.println(Thread.currentThread().getName() + ": 开始生产第" + productCount + "个产品");

            notify();   // 唤醒对方
        } else{
            try {
                wait();     // 由同步监视器调用, 正好也是this
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    // 消费产品
    public synchronized void consumeProduct() {         // 同步监视器是this
        if(productCount > 0){
            System.out.println(Thread.currentThread().getName() + ": 开始消费第" + productCount + "个产品");
            productCount--;

            notify(); // 唤醒对方
        }else{
            try {
                wait();     // 由同步监视器调用, 正好也是this
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}


class Producer extends Thread{
    private Clerk clerk;

    public Producer(Clerk clerk){
        this.clerk = clerk;
    }

    @Override
    public void run(){
        System.out.println(getName() + ": start to produce product...");

        while(true){

            // 控制生产速度
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            clerk.produceProduct();
        }
    }
}


class Consumer extends Thread{
    private Clerk clerk;
    public Consumer(Clerk clerk){
        this.clerk = clerk;
    }

    @Override
    public void run(){
        System.out.println(getName() + ": start to consume product...");

        while(true){

            // 控制消费速度
            try {
                Thread.sleep(2500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            clerk.consumeProduct();
        }
    }

}
