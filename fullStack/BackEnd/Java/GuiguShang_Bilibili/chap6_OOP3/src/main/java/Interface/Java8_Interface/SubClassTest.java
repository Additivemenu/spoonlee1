package Interface.Java8_Interface;

/**
 * @author xueshuo
 * @create 2023-01-30 5:08 pm
 */
public class SubClassTest {
    public static void main(String[] args) {
        SubClass s = new SubClass();

        // 知识点1: 接口中定义的static method, 只能通过接口来调用
        // s.method1();
        CompareA.method1();

        // 知识点2: 通过接口实现类的对象, 可以调用接口中的默认方法
        // 如果实现类重写了接口中的默认方法, 调用时仍然调用的是重写以后的方法
        s.method2();

        //  如果子类(或实现类)继承的父类和实现的接口中声明了同名同参数的方法,
        //  同时子类重写了同命同参的方法, 那就调用重写后的方法(废话)
        s.method3();

        // 知识点3： 如果子类(或实现类)继承的父类和实现的接口中声明了同名同参数的方法,
        // 那么子类在没有重写此方法的情况下, 默认调用父类中同命同参数的方法  ---> 类优先原则
        s.method4();

        // 知识点4: 如果实现类实现了多个接口, 而这多个接口中定义了同名同参数的默认方法
        // 那么在实现类没有重写此方法的情况下, 报错 ----> 接口冲突
        // 此时需要我们在实现类中必须重写该同命同参数方法以指明到底用哪个方法
    }

}


class SubClass extends SuperClass implements CompareA, CompareB{

    // 重写接口中的默认方法
    @Override
    public void method3(){
        System.out.println("SubClass override: Sydney");
    }


    // 知识点5: 如何在子类(实现类)的方法中调用父类, 接口中的默认方法
    public void myMethod(){
        method3();          // 自己重写的方法
        super.method3();    // 调用父类中的方法

        // 调用接口中的默认方法
        // CompareA.method3(); // illegal!
        CompareA.super.method3();       // 写法只是规定
        CompareB.super.method3();
    }


}