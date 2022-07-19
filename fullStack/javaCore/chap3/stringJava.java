
public class stringJava {

    public static void main(String[] args)
    {   
        // for section 3.6.1 sub string---------------------------------------------------------
        String greeting = "hello!";
        String s =greeting.substring(0,3); // starts from  char0, till char3(not including char3)  
        System.out.println(s);

        // for section 3.6.2 linking strings------------------------------------
        String a = "arc";
        String b = "tan10";
        String c = a+b;
        System.out.println(c);

        int age = 24;
        String man = "jerry"+age;
        System.out.println(man);
        // repeat method
        String repeated = "Java".repeat(3); 
        System.out.println(repeated);

        // this is for section 3.6.4 equals-----------------------------------
        System.out.println("---");
        boolean stringEquals = man.equals(repeated);
        System.out.println(stringEquals); // false

        boolean stringEquals2 = man.equals("jerry24");
        System.out.println(stringEquals2); // true
        
        // this is for section 3.6.9 demo code---------------------------------
        //构建一个空的字符串构造器
        System.out.println("---");
        StringBuilder builder = new StringBuilder();
        // 添加内容
        builder.append("who's ");
        builder.append("your daddy");
        // 字符串构建完成, 使用toString method将其转化成string
        String completedString = builder.toString();

        System.out.println(completedString);
    }


}