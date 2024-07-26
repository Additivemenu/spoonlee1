package principles.liskov.improvement;

/**
 * @author xueshuo
 * @create 2023-02-11 10:21 am
 */

public class Liskov2 {
    public static void main(String[] args) {
        A a = new A();
        System.out.println("11-3=" + a.func1(11, 3));
        System.out.println("1-8=" + a.func1(1, 8));
        System.out.println("-----------------------");

        // 因为B类不再继承A类, 因此调用者(e.g.另一个程序员)不会去认为func1是求差
        // 调用完成的功能就会很明确, 不会因为耦合而造成错误地调用
        B b = new B();
        System.out.println("11+3=" + b.func1(11, 3));   // 本意是11 + 3
        System.out.println("1+8=" + b.func1(1, 8));
        System.out.println("11+3+9=" + b.func2(11, 3));

        // 使用组合关系, B类仍然可以使用到A类的方法
        System.out.println("11-3="+ b.func3(11, 3));   // 本意是 11 - 3
    }
}

/**
 * 创建更加基础的基类
 */

class Base{
    //  把更加基础的方法和成员写到Base类

}


/**
 * A 类
 */
class A extends  Base{
    // 返回两数的差
    public int func1(int num1, int num2) {
        return num1 - num2;
    }
}


/**
 * B类继承A类
 * 增加了新的功能, 完成两个数相加, 并和9求和
 * 但无意中重写了func1()
 */
class B extends Base {
    // 如果类B需要使用A类的方法, 使用组合关系
    private A a = new A();



    // 这里重写了A类的方法, 可能是无意识的
    public int func1(int a, int b) {
        return a + b;
    }
    public int func2(int a, int b) {
        return func1(a, b) + 9;
    }

    // 我们仍然想使用类A的方法
    public int func3(int a, int b){
        return this.a.func1(a,b);
    }
}
