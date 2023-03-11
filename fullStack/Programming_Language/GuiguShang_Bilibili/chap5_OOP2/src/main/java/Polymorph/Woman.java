package Polymorph;

/**
 * @author xueshuo
 * @create 2023-03-10 10:20 am
 */
public class Woman extends Person{
    boolean isBeauty;

    public void goShopping(){
        System.out.println("Woman loves shopping");
    }

    @Override
    public void eat(){
        System.out.println("Woman need to eat less");
    }

    @Override
    public void walk(){
        System.out.println("Man walks beautifully");
    }



}
