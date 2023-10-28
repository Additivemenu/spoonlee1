package Interface.Java8_Interface.Practice;

/**
 * @author xueshuo
 * @create 2023-01-30 5:46 pm
 */
public class Java8_Interface_Practice {

}

interface Filial {// 孝顺的
    default void help() {
        System.out.println("老妈，我来了");
    }
}

interface Spoony {// 痴情的
    default void help() {
        System.out.println("媳妇，别怕，我来了");
    }
}

class Father{
    public void help(){
        System.out.println("儿子, 救我媳妇!");
    }
}

class Man extends Father implements Filial, Spoony{


    // 如果不重写 help(), 以父类中的方法为准
//    @Override
//    public void help() {
//        System.out.println("我该救谁呢?");   // 自己重写
//        Filial.super.help();        // 救妈
//        Spoony.super.help();        // 救媳妇
//
//    }
}