package threadSync.extend;

/**
 * 432
 * 情景: 创建3个窗口卖票, 总票数为100张, 使用继承Thread类的方式来创建线程
 * 使用静态代码块来解决线程安全问题
 *
 * 说明: 在继承Thread类创建多线程的方式中, 慎用this充当锁, 可以考虑使用当前类充当锁
 *
 * @author xueshuo
 * @create 2023-02-06 10:09 am
 */
public class WindowTest {
    public static void main(String[] args) {
        Window w1 = new Window();
        Window w2 = new Window();
        Window w3 = new Window();

        w1.setName("w1");
        w2.setName("w2");
        w3.setName("w3");

        // 仍然有问题, 存在重票
        // 需要线程安全的知识来解决, 待解决
        w1.start();
        w2.start();
        w3.start();
    }
}

class Window extends Thread{
    private static int ticket = 100;
    private static Object obj = new Object();       // 注意得是 static, 保证多个Window的实例共享同一把锁

    @Override
    public void run(){
        while(true){

            // 方式一: 用Window.class作为锁
            synchronized (Window.class) {   // 方式二: 使用Thread子类的静态成员变量作为锁, synchronized (obj) {

                if (ticket > 0) {

                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println(Thread.currentThread().getName() + ": sell ticket, ticket index is: " + ticket);
                    ticket--;
                } else {
                    break;
                }
            }
        }
    }
}



