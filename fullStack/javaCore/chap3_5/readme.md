# 1.Introduction

Data stored in variables is lost when a program ends

How can we save data, and load it back some time later?

We need to store it in a file, either on disk or on an SSD.  This is called Input/Output, or I/O.

## 1.1 Stream objects

To communicate with the outside world, java uses stream objects.

+ If the data flows into a program, then the stream is called an input stream.

+ If the data flows out of a program, then the stream is called an output stream.

> The name "stream" comes because a stream represents a file as a sequence of bytes one after the other.  These are then interpreted by the program as characters, integers, strings or such like.  However, because streams are sequential, data structures such as trees must be "serialized" (turned into a sequence of bytes) before they can be written to a stream.

### 1.1.1 System streams

You have already come across streams in the first lesson.  System.out is a stream which, by default, sends data to the screen.

```java
System.out.println("Output stream");
```

You can also read in from the keyboard using the standard stream  System.in.

```java
import java.util.Scanner;

class Main {
    public static void main (String[] args) {
        System.out.println("Type a string, and I will echo it");

        Scanner keyboard = new Scanner(System.in); // <=======
        System.out.println(keyboard.nextLine());
    }
}
```

## 1.2 Files

All data in a computer is stored as "numbers", but those numbers can be interpreted in many ways.

An important example is "text files", in which the numbers are interpreted as letters or other text characters.

In a binary file, the number 1000 be stored in a more efficient way, the way variables are stored in memory.

### 1.2.1 Text files
Text files are sequences of characters (letters, punctuation etc.), typically designed to be read and modified by humans, using a general-purpose text editor.

They're sometimes called **ASCII files**, because the mapping between characters as their numeric values is based on the ASCII scheme.  However, these days they often contain Unicode text, which is an extension of ASCII.

Text file formats are often more portable between applications or types of computers than binary formats.

### 1.2.2 Binary files

Files called "binary files" are ones that are not intended to be read by people, such as executable files or compressed files.  They also include most word processor and spreadsheet files; even though the documents may be intended to be viewed by people, they won't read the files one character at a time.

Binary files are used because they are more efficient to process than text files. The data is stored more similarly to the way it is in memory.  Since that is done differently on different types of computer (PCs vs Macs vs mainframes), the files can be incompatible unless the format is deliberately standardized.

Java tries to make its binary files portable. (Non-assessable:  It does that by storing all data big-endian, even on little-endian machines.)

# 2. Text files

## 2.1 Writing to a text file

### 2.1.1 PrintWriter class
The class PrintWriter is a stream class used for writing text to a file. This class has methods print and println, just like System.out does.

```java
// All file I/O classes are in package  java.io
import java.io.PrintWriter;         // the class that formats
import java.io.FileOutputStream;    // the class that actually writes to the file

class Main {
    public static void main (String[] args) {
        PrintWriter outputStream = null;
        
        // opening a file to write------------------------------------
        // The process of connecting a stream to a file is called "opening" the file
        // Use PrintWriter constructor with FileName argument
        // "new FileOutputStream(...) creates an object that PrintWriter can use
        outputStream = new PrintWriter(new FileOutputStream("example.txt"));

        // If "example.txt" already existed, its contents have been erased.
        // If it did not exist, it has been created.
        // Either way, it is now a zero-length file.

        // Write to the file opened------------------------------------
        // Now we can use the PrintWriter object:
        outputStream.print("Hello, world!");
    }
}
```

直接跑上面代码的结果:
```shell
Main.java:13: error: unreported exception FileNotFoundException; must be caught or declared to be thrown
        outputStream = new PrintWriter(new FileOutputStream("example.txt"));
                                       ^
1 error
```


#### Opening

Note that in the above example, the FileOutputStream object is an anonymous argument.  It cannot be accessed except by the PrintWriter object.  The purpose of the FileOutputStream class is to connect a class that outputs to a stream, such as PrintWriter, to a particular file in the filesystem.

The process of connecting an output stream to a file is called opening the file (for writing).

#### Exceptions
When a text file is opened in this way, a _FileNotFoundException_ can be thrown.  In this context it actually means that the file could not be created.  The name was chosen because this type of exception can also be thrown when a program attempts to open a file for reading and there is no such file, and reading is more common than writing.

It is therefore necessary to enclose this code in exception handling blocks.

+ The file should be opened inside a try block

+ A catch block should catch and handle the possible exception

+ The variable that refers to the PrintWriter object should be declared outside the block (and initialized to null) so that it is not local to the block

#### Closing

When a program is finished writing to a file, it should always close the stream connected to that file.

```java
outputStreamName.close();
```

This allows the system to release any resources used to connect the stream to the file. If the program does not close the file before the program ends, Java will close it automatically, but it is safest to close it explicitly as soon as the writing is finished. 

> If the system crashes while the file is open, then it may be left in an "inconsistent" state, which means that it won't be able to be read when the computer reboots or, worse, it may contain corrupted data.  Keeping the file open also means that other programs, such as system updates, cannot access the file.  That is a common reason for an annoying reboot to be required when updating or installing new software.

## 3.1 Reading from a text file




# 3. Binary files
