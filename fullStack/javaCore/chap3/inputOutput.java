import java.util.*; // Scanner 类定义在java.util中. 当使用的类不是定义在基本java.lang包中时， 一定要使用import
// 指令导入相应的包

public class inputOutput {
    public static void main(String[] args)
    {
        Scanner in = new Scanner(System.in);

        //get first input
        System.out.println("What is your name?");
        String name = in.nextLine();

        //get second input
        System.out.print("How old are you?");
        int age = in.nextInt();

        //display output on console
        System.out.println("Hello," + name + ". Next year, you'll be " + (age+1));
    }
}
