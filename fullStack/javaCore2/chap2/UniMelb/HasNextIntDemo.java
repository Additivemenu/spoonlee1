import java.util.Scanner;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import java.io.PrintWriter;
import java.io.FileOutputStream;

public class HasNextIntDemo {
    public static void main(String[] args) {
        Scanner inputStream = null;
        String filename = "data.txt";

        createData("1 2\n3 4 hi 5\n6 7\n8 9", filename);

        try {
            inputStream = new Scanner(new FileInputStream(filename));
        } catch (FileNotFoundException e) {
            System.err.print  ("File " + filename + " was not found ");
            System.err.println("or could not be opened.");
            System.exit(1);
        }

        // original demo -----------------------------------
        // int next, sum = 0;
        // while (inputStream.hasNextInt()) {          // read until a non-Int appears
        //     next = inputStream.nextInt();
        //     sum = sum + next;
        // }
        // inputStream.close();

        // System.out.println("The sum of the numbers is " + sum);     // the result is 10: 1+2+3+4

        // exercise-----------------------------------
        int next, sum = 0;
        while (inputStream.hasNextInt() || inputStream.hasNextLine()) { 
            if (! inputStream.hasNextInt()){
                inputStream.nextLine();         // consume the remaining line, move 'cursor' to the start of next line
            }

            next = inputStream.nextInt();
            sum = sum + next;
            System.out.println("Current round: next is "+ next+", sum is "+sum);
        }
        inputStream.close();
        System.out.println("The sum of the numbers is " + sum);  // the result is 40: 1+2+3+4+ 6+7+8+9

    }

    // Create the file to be read above.
    static void createData (String s, String filename) {
        try {
            PrintWriter p = new PrintWriter(new FileOutputStream(filename));
            p.print(s);
            p.close();
        } catch (Exception e) {
            System.err.println("oops");
            System.exit(1);
        }
    }
}
