package Polymorph2;

/**
 * 多态使用举例
 *
 * @author xueshuo
 * @create 2023-03-10 11:08 am
 */
public class AnimalTest {

    public static void main(String[] args) {
        AnimalTest test = new AnimalTest();

        test.func(new Dog());

        test.func(new Cat());
    }

    public void func(Animal animal){        // Animal animal = new Dog();
        animal.eat();
        animal.shout();
    }

//    // 如果不用多态, 则需要写很多重载方法
//    public void func(Dog dog){
//        dog.eat();
//        dog.shout();
//    }
//
//    public void func(Cat cat){
//        cat.shout();
//        cat.shout();
//    }
}




class Animal{
    public void eat(){
        System.out.println("animal eat");
    }

    public void shout(){
        System.out.println("animal shout");
    }

}

class Dog extends Animal {
    @Override
    public void eat(){
        System.out.println("dog eat bones");
    }

    @Override
    public void shout(){
        System.out.println("woo, woo, woo!");
    }
}

class Cat extends Animal {
    @Override
    public void eat(){
        System.out.println("cat eat fish");
    }

    @Override
    public void shout(){
        System.out.println("miao, miao, miao!");
    }
}