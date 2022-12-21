//链接：https://www.nowcoder.com/questionTerminal/ea89183b5d5349f7ac6a11da2308d935
//来源：牛客网
package Java_Basics;

public class Code1{
    String str = new String("good");
    char[ ] ch = { 'a' , 'b' , 'c' };
    public static void main(String args[]){
        Code1 ex = new Code1();
        ex.change(ex.str,ex.ch);
        System.out.print(ex.str + " and ");
        System.out.print(ex.ch);
    }
    public void change(String str,char ch[ ]){
        str = "test ok";
        ch[0] = 'g';
    }
}