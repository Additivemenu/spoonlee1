import java.util.Scanner;
import java.util.InputMismatchException;

class Main {
    public static void main (String[] args) {
        Scanner keyboard = new Scanner(System.in);
        int number = 0;     // initialize to keep the compiler happy
        boolean done = false;
        while (!done) {
            try {
                System.out.println("Enter a whole number:");
                number = keyboard.nextInt();    // may throw
                done = true;                    // only if nextInt succeeded
            } catch (InputMismatchException e) {
                keyboard.nextLine();
                System.out.println("That was not a correctly written whole number.");
                System.out.println("Try again.");
            }
        }
        System.out.println("You entered " + number);
    }
}
