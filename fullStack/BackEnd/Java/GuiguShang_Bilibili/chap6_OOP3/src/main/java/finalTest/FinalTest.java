package finalTest;

/**
 * final 关键字
 * 1. final可以修饰的结构: 类, 方法, 变量
 *
 * 2. final修饰一个类: 此类不能被其他类所继承
 *         比如: String类, System类, StringBuffer类
 *
 * 3. final修饰一个方法: 表明此方法不可以被重写
 *         比如: Object类中的getCLass()
 *
 * 4. final修饰一个变量: 此时的'变量'成为一个常量
 *     4.1 final 修饰属性: 可以考虑初始化的位置有： 显式初始化 (默认初始化失效), 代码块中初始化, 构造器中初始化
 *     4.2 fianl 修饰局部变量:
 *                  尤其是用final修饰形参时, 表明此形参是一个常量. 当我们调用此方法时, 才会给常量形参赋一个实参. 一旦赋值后, 就只能在方法体内使用此形参
 *                  但不能重新赋值
 *
 * `static final` 用来修饰 属性:  很常见, 表示全局常量
 *              用来修饰 方法:  用的少, 一般自己写代码很少修饰方法为final
 *
 * @author xueshuo
 * @create 2023-03-17 8:18 am
 */
public class FinalTest {
    // 显式初始化
    final int WIDTH = 10;

    // 代码块初始化final修饰的属性
    final int LEFT;
    {
        LEFT = 1;
    }

    // 构造器初始化final修饰的属性
    final int RIGHT;
    public FinalTest(){
        RIGHT = 2;
    }

    public FinalTest(int n){
        RIGHT = n;
    }

    // 不可以通过方法来'初始化'fianl修饰的属性
//    final int DOWN;
//
//    public void setDown(int down){
//        this.DOWN = down;
//    }

    // 在被final修饰的'变量'被初始化后, 不可以修改它
    public void doWidth(){
//        WIDTH = 20;
    }


    // 局部变量 ---------------------------------------
    // 普通的局部变量
    public void show () {
        final int NUM = 10;     // 常量
//        NUM += 20;
    }

    // 形参
    public void show(final int num){
//        num = 100; // 编译不通过
        System.out.println(num);
    }

    public static void main(String[] args) {
        FinalTest test = new FinalTest();
        test.show(10);
    }

}

final class FinalA{

}

class AA {
    public final void show(){

    }
}

//class BB extends  AA {
//    @Override
//    public  void show(){
//
//    }
//}

