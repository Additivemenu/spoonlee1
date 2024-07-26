package principles.liskov;

/**
 * @author xueshuo
 * @create 2023-02-11 10:14 am
 */
public class Liskov {
    public static void main(String[] args) {
        A a = new A();
        System.out.println("11-3=" + a.func1(11, 3));
        System.out.println("1-8=" + a.func1(1, 8));
        System.out.println("-----------------------");

        B b = new B();
        System.out.println("11-3=" + b.func1(11, 3));       // 这里程序员的本意是想调用父类的求差方法 求11-3, 但程序员无意在子类中重写了那个方法
        System.out.println("1-8=" + b.func1(1, 8));
        System.out.println("11+3+9=" + b.func2(11, 3)); }
}

/**
 * A 类
 */
class A {
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
class B extends A {
    // 这里重写了A类的方法, 可能是无意识的
    public int func1(int a, int b) {
        return a + b;
    }
    public int func2(int a, int b) {
        return func1(a, b) + 9;
    }
}