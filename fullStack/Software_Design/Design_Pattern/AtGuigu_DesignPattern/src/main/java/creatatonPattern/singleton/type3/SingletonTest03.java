package creatatonPattern.singleton.type3;

/**
 * @author xueshuo
 * @create 2023-02-12 9:31 am
 */
public class SingletonTest03 {
    public static void main(String[] args) {
        System.out.println("lazy mode, 线程不安全");
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
    // 但这种写法线程不安全
    // 即懒汉式
    public static Singleton getInstance(){
        if(instance == null){
            instance = new Singleton();
        }
        return instance;
    }

}