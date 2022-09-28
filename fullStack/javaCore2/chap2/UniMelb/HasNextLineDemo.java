// for input
import java.util.Scanner;
import java.io.FileInputStream;
// for output
import java.io.PrintWriter;
import java.io.FileOutputStream;
// for Exception
import java.io.FileNotFoundException;

//===================================================================================
public class HasNextLineDemo {
    public static void main(String[] args) {
        // step0: 声明扫描器和打印机
        Scanner inputStream = null;
        PrintWriter outputStream = null;

        createOriginal ("A photon checks into a hotel.\n"
                      + "The clerk asks \"Do you have any luggage?\"\n"
                      + "The photon replies \"No, I'm travelling light\"\n",
                      "original.txt");

        // step1: 尝试连接: 扫描器和对应的纸, 打印机和对应的纸; 如果连接失败就报错
        try {
            inputStream = new Scanner(new FileInputStream("original.txt"));
            outputStream = new PrintWriter(new FileOutputStream("numbered.txt"));
            //throw new FileNotFoundException();    // 100% throw FileNotFoundException();
        } catch (FileNotFoundException e) {
            System.err.println("Problem opening files.");
            System.exit(1);                         // exit program and all following codes are aborted
        }

        // step2: 正式read and write
        String line = null;
        int count = 0;

        while (inputStream.hasNextLine()) {         // if the next line exists
            line = inputStream.nextLine();
            count++;
            outputStream.println(count + " " + line);
        }
        
        System.out.println(inputStream.hasNextLine());      // false
        // inputStream.nextLine();                          // if this gets run, NoSuchElementException: No line found will pop out

        // step3: 关闭扫描器和打印机
        inputStream.close();
        outputStream.close();
    }

        // Create the file to be read above.
    static void createOriginal (String s, String filename) {
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
