package Downcasting;

/**
 * @author xueshuo
 * @create 2023-03-10 10:18 am
 */
public class Man extends Person {
    boolean isSmoking;
    public void earnMoney(){
        System.out.println("man needs to make money!");
    }
    @Override
    public void eat(){
        System.out.println("Man need to eat more");
    }

    @Override
    public void walk(){
        System.out.println("Man walks like a hero");
    }

}
