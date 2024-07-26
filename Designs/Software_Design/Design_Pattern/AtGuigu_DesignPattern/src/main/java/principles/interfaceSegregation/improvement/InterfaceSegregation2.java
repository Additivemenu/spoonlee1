package principles.interfaceSegregation.improvement;

/**
 * 采用接口隔离原则
 * @author xueshuo
 * @create 2023-02-10 8:45 pm
 */
public class InterfaceSegregation2 {
    public static void main(String[] args) {

        A a = new A();      // A depends on B via Interface1, 2, but only use method 1, 2, 3
        a.depend1(new B()); // 体现A类通过接口依赖(使用)类B
        a.depend2(new B());
        a.depend3(new B());

        C c = new C();      // C depends on B via Interface1, 3, but only use method 1, 4, 5
        c.depend1(new D());
        c.depend4(new D());
        c.depend5(new D());
    }

}


interface Interface1{
    void operation1();
}

interface Interface2{
    void operation2();
    void operation3();

}

interface Interface3{
    void operation4();
    void operation5();
}

class B implements  Interface1, Interface2{
    public void operation1(){
        System.out.println("B implements operation1");
    };
    public void operation2(){
        System.out.println("B implements operation2");
    };
    public void operation3(){
        System.out.println("B implements operation3");
    };

}


class D implements Interface1, Interface3{
    public void operation1(){
        System.out.println("D implements operation1");
    };
    public void operation4(){
        System.out.println("D implements operation4");
    };
    public void operation5(){
        System.out.println("D implements operation5");
    };
}



class A {
    public void depend1(Interface1 i){
        i.operation1();
    }

    public void depend2(Interface2 i){
        i.operation2();
    }

    public void depend3(Interface2 i){
        i.operation3();
    }
}


class C {
    public void depend1(Interface1 i){
        i.operation1();
    }

    public void depend4(Interface3 i){
        i.operation4();
    }

    public void depend5(Interface3 i){
        i.operation5();
    }
}
