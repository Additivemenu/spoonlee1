package principles.interfaceSegregation;

/**
 * 不采用接口隔离原则
 * @author xueshuo
 * @create 2023-02-10 8:27 pm
 */
public class InterfaceSegregation1 {
    public static void main(String[] args) {
        B b = new B();      // B implements Interface1
        A a = new A();      // A depends on B via Interface1, but only use method 1, 2, 3
        a.depend1(b);
        a.depend2(b);
        a.depend3(b);

        D d = new D();      // D implements Interface1
        C c = new C();      // C depends on B via Interface1, but only use method 1, 4, 5
        c.depend1(d);
        c.depend4(d);
        c.depend5(d);
    }

}

interface Interface1{
    void operation1();
    void operation2();
    void operation3();
    void operation4();
    void operation5();
}

class B implements Interface1 {
    public void operation1(){
        System.out.println("B implements operation1");
    };
    public void operation2(){
        System.out.println("B implements operation2");
    };
    public void operation3(){
        System.out.println("B implements operation3");
    };
    public void operation4(){
        System.out.println("B implements operation4");
    };
    public void operation5(){
        System.out.println("B implements operation5");
    };
}

class D implements Interface1 {
    public void operation1(){
        System.out.println("D implements operation1");
    };
    public void operation2(){
        System.out.println("D implements operation2");
    };
    public void operation3(){
        System.out.println("D implements operation3");
    };
    public void operation4(){
        System.out.println("D implements operation4");
    };
    public void operation5(){
        System.out.println("D implements operation5");
    };
}

/**
 * A 类通过Interface1 依赖（使用）B类, 但是只会使用到1,2,3 方法
 */
class A {
    public void depend1(Interface1 i){
        i.operation1();
    }

    public void depend2(Interface1 i){
        i.operation2();
    }

    public void depend3(Interface1 i){
        i.operation3();
    }
}

/**
 * C类通过Interface1 依赖（使用）D类, 但是只会使用到1,4,5 方法
 */
class C {
    public void depend1(Interface1 i){
        i.operation1();
    }

    public void depend4(Interface1 i){
        i.operation4();
    }

    public void depend5(Interface1 i){
        i.operation5();
    }
}
