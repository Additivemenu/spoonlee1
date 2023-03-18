package creatatonPattern.singleton.type8;

/**
 * @author xueshuo
 * @create 2023-03-19 8:43 am
 */
public class SingletonTest08 {
    public static void main(String[] args) {
        Singleton instance = Singleton.INSTANCE;
        Singleton instance2 = Singleton.INSTANCE;

        System.out.println(instance == instance2);          // true

        System.out.println(instance.hashCode());
        System.out.println(instance2.hashCode());

        instance.sayOK();           // OK
    }
}

// 使用枚举可以实现单例, 推荐使用
enum Singleton{
    INSTANCE;       // 属性

    public void sayOK(){
        System.out.println("OK");
    }
}