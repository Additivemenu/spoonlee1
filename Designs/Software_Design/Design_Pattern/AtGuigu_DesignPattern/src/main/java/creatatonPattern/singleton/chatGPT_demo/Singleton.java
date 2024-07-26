package creatatonPattern.singleton.chatGPT_demo;

/**
 * @author xueshuo
 * @create 2023-04-02 7:46 pm
 */
public class Singleton {

    private static Singleton instance;

    // Attribute that is also an object
    private SomeClass attribute;

    private Singleton(int input) {
        // Initialize the attribute object with the given input
        attribute = new SomeClass(input);
    }

    public static Singleton getInstance(int input) {
        if (instance == null) {
            instance = new Singleton(input);
        }
        return instance;
    }

    // Getter for the attribute
    public SomeClass getAttribute() {
        return attribute;
    }

    // Other methods and fields for the singleton class
    //
    public static void main(String[] args) {
        Singleton instance = Singleton.getInstance(44);
        Singleton instance1 = Singleton.getInstance(44);

        System.out.println(instance == instance1);      // true
        System.out.println("instance.hashCOde = " + instance.hashCode());
        System.out.println("instance1.hashCOde = " + instance1.hashCode());

        System.out.println(instance.getAttribute() == instance1.getAttribute());
    }
}

class SomeClass {
    private int value;

    public SomeClass(int value) {
        this.value = value;
    }

    // Other methods and fields for the SomeClass


}
