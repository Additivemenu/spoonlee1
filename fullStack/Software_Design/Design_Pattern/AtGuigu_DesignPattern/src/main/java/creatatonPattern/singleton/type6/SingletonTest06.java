package creatatonPattern.singleton.type6;

/**
 * 32
 * 懒汉式线程安全写法: DoubleCheck
 * @author xueshuo
 * @create 2023-02-12 9:31 am
 */
public class SingletonTest06 {
    public static void main(String[] args) {
        System.out.println("Double check: lazy mode, 线程安全");
        Singleton instance = Singleton.getInstance();
        Singleton instance1 = Singleton.getInstance();

        System.out.println(instance == instance1);      // true
        System.out.println("instance.hashCOde = " + instance.hashCode());
        System.out.println("instance1.hashCOde = " + instance1.hashCode());
    }
}

class Singleton{

    private static volatile Singleton instance;

    private Singleton(){

    }

    // 对外提供一个static public method, 当该方法被用到时, 才去创建instance
    // DoubleCheck方式, 实现了lazy mode 同时解决线程安全问题和l效率问题
    // 即懒汉式
    public static Singleton getInstance(){
        if(instance == null){       // 当第一个线程已经创建好instance后, 之后的线程不需要再等待同步监视器被释放才能return instance, 提升效率

            synchronized (Singleton.class){
                if(instance == null){       // 防止跟在第一个new instance的线程后面的几个线程再次new instance, 解决线程安全问题
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }

}