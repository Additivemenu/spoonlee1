// UniMelb wk2 tut practices

import  java.util.Scanner;

public class practice {
    public static void main(String[] args) {
            
        
         Scanner scanner = new Scanner(System.in);
 
         System.out.print("Enter amount of fruits: ");
         int fruNum = scanner.nextInt();
         
         System.out.print("Enter amount of seashells: ");
         int seaShellNum = scanner.nextInt();
 
         double totalPrice = fruNum*2.50 + seaShellNum*0.6;
         System.out.println("Total price is " + totalPrice);
     }
}
