package javaCore.chap7.UniMelb;

import java.util.Scanner;
import java.util.InputMismatchException;

// request re-enter input if the input is invalid until it is valid

public class InputMismatchRepop {
    public static void main (String[] args) {

        Scanner keyboard = new Scanner(System.in);

        int number = 0;     // initialize to keep the compiler happy
        boolean done = false;

        while (!done) {
            try {

                System.out.println("Enter a whole number:");

                // e.g. input =1, 10.5, 10,5, 10/5 will throw
                // you can check Oracle docs to see detail Exception might be thrown
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
