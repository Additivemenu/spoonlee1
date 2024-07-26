package creatatonPattern.singleton.type4;

/**
 * 32
 * 懒汉式线程安全写法: 同步方法
 * @author xueshuo
 * @create 2023-02-12 9:31 am
 */
public class SingletonTest04 {
    public static void main(String[] args) {
        System.out.println("lazy mode, 线程安全");
        Singleton instance = Singleton.getInstance();
        Singleton instance1 = Singleton.getInstance();

        System.out.println(instance == instance1);      // true
        System.out.println("instance.hashCOde = " + instance.hashCode());
        System.out.println("instance1.hashCOde = " + instance1.hashCode());
    }
}

class Singleton{

    private static Singleton instance;

    private Singleton(){

    }

    // 对外提供一个static public method, 当该方法被用到时, 才去创建instance
    // 同步方法解决线程安全问题
    // 即懒汉式
    public static synchronized Singleton getInstance(){
        if(instance == null){
            instance = new Singleton();
        }
        return instance;
    }

}