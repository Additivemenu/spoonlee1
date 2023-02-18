package creatatonPattern.singleton.type2;

/**
 *
 * 饿汉式: 静态代码块
 * @author xueshuo
 * @create 2023-02-11 10:05 pm
 */
public class SingletonTest02 {

    public static void main(String[] args) {
        Singleton instance = Singleton.getInstance();
        Singleton instance1 = Singleton.getInstance();

        System.out.println(instance == instance1);      // true
        System.out.println("instance.hashCOde = " + instance.hashCode());
        System.out.println("instance1.hashCOde = " + instance1.hashCode());
    }
}

// 饿汉式 (静态代码块)
class Singleton{
    // step1: 构造器私有化, 外部不能new
    private Singleton(){

    }

    // step2: 本类内部创建对象实例
    private static Singleton instance;
    // 在静态代码块中创建单例对象
    static {
        instance = new Singleton();
    }

    // step3: 对外提供一个公有的静态方法, 返回实例对象
    public static Singleton getInstance(){
        return instance;
    }
}