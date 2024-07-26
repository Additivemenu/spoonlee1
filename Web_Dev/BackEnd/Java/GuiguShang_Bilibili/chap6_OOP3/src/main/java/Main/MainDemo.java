package Main;

/**
 * @author xueshuo
 * @create 2023-03-16 10:21 pm
 */
public class MainDemo {
    public static void main(String[] args) {

        for(int i=0 ; i < args.length; i++){
            System.out.println("*********" + args[i]);      // 字符串

            System.out.println("######" + Integer.parseInt(args[i]));           // 字符串转为int
        }
    }
}
