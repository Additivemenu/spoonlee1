
// for input
import java.util.Scanner;
import java.io.FileInputStream;
// for output 
import java.io.FileOutputStream;
import java.io.PrintWriter;
// for Exception 
import java.io.FileNotFoundException;

//==============================================================
public class TextFileScannerDemo {
    public static void main (String[] args) {
        String filename = "morestuff.txt";

        // Create the file to be read------------------------------
        createMorestuff ("1 2\n3 4\nEatMyShorts", filename);

        System.out.print  ("I will read three numbers and a line ");
        System.out.println("of text from the file " + filename + ".");

        // start to read text file --------------------------------
        Scanner inputStream = null;     // this should be outside of try block

        // link scanner with the input stream that connects with the file
        try {
            inputStream = new Scanner(new FileInputStream(filename));
        } catch (FileNotFoundException e) {
            System.err.print  ("File " + filename + " was not found ");
            System.err.println("or could not be opened.");
            System.exit(1);
        }

        // read text file and display in the screen----------------
        int n1 = inputStream.nextInt();
        int n2 = inputStream.nextInt();
        int n3 = inputStream.nextInt();
        
        //To go to the next line.  What happens if this line is omitted?
        inputStream.nextLine();     // consume the remaining line

        String line = inputStream.nextLine();

        System.out.println("The three numbers read from the file are:");
        System.out.println(n1 + ", " + n2 + ", and " + n3);

        System.out.println("The line read from the file is:");
        System.out.println(line);

        inputStream.close(); // remember to close Scanner
    }

    // Create the file to be read above.----------------------------
    static void createMorestuff (String s, String filename) {
        try {
            PrintWriter p = new PrintWriter(new FileOutputStream(filename)); //这行代码相当于是把打印机连接到对应的纸上, 还没正式打印, 如果这张纸不存在那就报错
            
            p.print(s);     //正式打印

            p.close();      //关闭打印机
        } catch (Exception e) {
            System.err.println("oops");
            System.exit(1);
        }
    }
}