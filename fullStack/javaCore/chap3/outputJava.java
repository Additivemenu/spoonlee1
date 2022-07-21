import java.io.PrintWriter;

public class outputJava {

      public static void main(String[] args) {
    
        try {
          PrintWriter output = new PrintWriter("./fullStack/javaCore/chap3/output.txt"); 
    
          int age = 25;
    
          output.printf("I am %d years old.", age);
          output.close();
        }
        catch(Exception e) {
          e.getStackTrace();
        }
      }
    
}
