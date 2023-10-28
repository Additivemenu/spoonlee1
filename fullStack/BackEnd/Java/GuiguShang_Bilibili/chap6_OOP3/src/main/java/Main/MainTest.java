package Main;

/**
 * main()方法的使用说明
 * 1. main()作为程序的入口
 * 2. main() 方法也是普通的静态方法,
 *      即可以通过类去调用main()
 *      main()内部不能通过类调用非静态方法, 而只能通过对象调用非静态方法
 * 3. main() 的形参, 允许我们与控制台交互 (之前我们是用Scanner)
 *
 * @author xueshuo
 * @create 2023-03-16 10:12 pm
 */
public class MainTest {

    public static void main(String[] args) {

        Main.main(new String[100]);

        // main()内部只能通过对象调用非静态结构
        MainTest test = new MainTest();
        test.show();
    }


    public void show(){

    }
}

class Main{

    public static void main(String[] args) {

        for(int i = 0 ; i < args.length; i++){
            args[i] = "args_" + i;
            System.out.println(args[i]);
        }
    }
}
