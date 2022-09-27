// All file I/O classes are in package  java.io
import java.io.PrintWriter;         // the class that formats
import java.io.FileOutputStream;    // the class that actually writes to the file
import java.io.FileNotFoundException;

public class binary_writing {
    public static void main (String[] args) {
        PrintWriter outputStream = null;
        
        // opening a file to write------------------------------------
        // The process of connecting a stream to a file is called "opening" the file
        // Use PrintWriter constructor with FileName argument
        // "new FileOutputStream(...) creates an object that PrintWriter can use
        try {
            outputStream = new PrintWriter(new FileOutputStream("example.txt"));
            
        }
        // If "example.txt" already existed, its contents have been erased.
        // If it did not exist, it has been created.
        // Either way, it is now a zero-length file.
        catch(FileNotFoundException e){
            
            System.out.println("Could not open example.txt for writing");
            System.exit(1);
        }
        // Write to the file opened------------------------------------
        // Now we can use the PrintWriter object:
        outputStream.print("Hello, world!");
    }
}
