package creatatonPattern.singleton.type7;

/**
 * 35
 * 使用静态内部类完成单例模式
 * @author xueshuo
 * @create 2023-02-12 9:31 am
 */
public class SingletonTest07 {
    public static void main(String[] args) {
        System.out.println("静态内部类实现Singleton");
        Singleton instance = Singleton.getInstance();
        Singleton instance1 = Singleton.getInstance();

        System.out.println(instance == instance1);      // true
        System.out.println("instance.hashCOde = " + instance.hashCode());
        System.out.println("instance1.hashCOde = " + instance1.hashCode());
    }
}

// 静态内部类完成, 推荐使用
class Singleton{

    private static volatile Singleton instance;

    // 构造器私有化
    private Singleton(){

    }

    // 静态内部类, 该类中有一个静态的属性 Singleton
    private static class SingletonInstance{
        private static final Singleton INTANCE = new Singleton();
    }


    // 对外提供一个static public method, 直接返回SingletonInstance.INSTANCE
    public static Singleton getInstance(){
        return SingletonInstance.INTANCE;
    }

}