package javaCore.chap3;

public class UniMelb_quizPractice {
    public static void main(String[] args)
    {
        int x = 10;
        int y = 4;

        // number followed by String
        System.out.println(x + x*y + (double)x/y + x%y + " is the answer."); // 10 + 40 + 2.5 +2:  54.5 
        // String followed by number
        System.out.println("Result is: " + x*y + (double)x/y + x%y); // string 
    }
}
