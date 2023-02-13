package threadSync.singleton;

/**
 * 435
 * 使用同步机制将单例模式中的懒汉式改为线程安全的
 * @author xueshuo
 * @create 2023-02-13 9:39 am
 */
public class BankTest {

}


class Bank{
    private Bank(){

    }

    private static Bank instance = null;

    // 方式二: 同步方法
//    public static synchronized Bank getInstance(){           // 调用getInstance() in run(), 意味着可能多个线程要调用getInstance()
//        if(instance == null){
//            instance = new Bank();
//        }
//        return instance;
//    }


    // 方式二: 同步代码块
    public static Bank getInstance(){           // 调用getInstance() in run(), 意味着可能多个线程要调用getInstance()

//        // 方式一: 同步代码块 效率差一些. 如果instance已经被创建了,
//        // 之后的线程在调用getInstance()时还必须再去等synchronized释放锁了, 进去才reuturn intance
//        synchronized (Bank.class) {
//            if(instance == null){
//                instance = new Bank();
//            }
//            return instance;
//        }

        // 方式二: 效率更高一些. 如果instance已经被创建了,
        // 那么之后的线程在调用getInstance()时没必要再去等synchronized释放锁了
        // 直接return创建好的instance的引用
        if(instance == null){
            synchronized (Bank.class) {
                if(instance == null){
                    instance = new Bank();
                }
            }
        }
        return instance;
    }


}