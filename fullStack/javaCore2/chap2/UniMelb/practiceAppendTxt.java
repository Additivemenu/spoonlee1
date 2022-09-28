import java.util.Scanner;

// for output 
import java.io.FileOutputStream;
import java.io.PrintWriter;
// for Exception 
import java.io.FileNotFoundException;

public class practiceAppendTxt {
    public static void main (String[] args) {
        System.out.println("Type a sequence of non-empty lines");
        System.out.println("To clear the file and start again, type 'reset'.");
        String filename = "output.txt";

        // open filename as outStream;
        String str;
        boolean done = false;
        Scanner kbd = new Scanner (System.in);

        // step0: 声明打印机
        PrintWriter outputStream = null;

        while (!done) {
            // Read a string from the keyboard------
            str = kbd.nextLine();

            // response based on kbd input----------
            // step1: 连接打印机和纸
            if (str.length() == 0) {                   // empty input, then exit
                break;
            } else if (str.equals("reset")) {          // input is 'reset', link printer to an empty txt
                try {
                outputStream = new PrintWriter(new FileOutputStream(filename));
                
                } catch (FileNotFoundException e) {
                System.err.println("Problem opening files.");
                System.exit(1);                         // exit program and all following codes are aborted
                }
                continue;

            } else {                                    // input is a valid String, link printer to an appendable txt
                try {
                outputStream = new PrintWriter(new FileOutputStream(filename, true));

                } catch (FileNotFoundException e) {
                System.err.println("Problem opening files.");
                System.exit(1);                         // exit program and all following codes are aborted
                }
            }

            // step2: output
            outputStream.println(str);
            // step3: clean up
            outputStream.close();

        } // end of while loop-------

    }

    // // Convenience function, since this is done twice.
    // private static PrintWriter newFileOrExit (String filename) {
    //     // Open a PrintWriter to overwrite filename,
    //     // or exit with status 1 and an error message
    //     // "Error opening " + filename + " for writing."
    //     // if an exception is thrown.
    //     PrintWriter outStream = null;
    //     outputStream = new PrintWriter(new FileOutputStream(filename));
    //     return outStream;
    // }
}