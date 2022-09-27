[Java I/O tutorial by Oracle](https://docs.oracle.com/javase/tutorial/essential/io/index.html)

[Online tutorial](https://www.tutorialspoint.com/java/java_files_io.htm)

# 1.Introduction

Data stored in variables is lost when a program ends

How can we save data, and load it back some time later?

We need to store it in a file, either on disk or on an SSD.  This is called Input/Output, or I/O.

## 1.1 Stream objects

To communicate with the outside world, java uses stream objects. A stream can be defined as a sequence of data. 

+ If the data flows into a program, then the stream is called an **input stream (InPutStream)**.

+ If the data flows out of a program, then the stream is called an **output stream (OutPutStream)**.

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
The class **PrintWriter** is a stream class used for writing text to a file (the class that outputs to a output stream). This class has methods print and println, just like System.out does.

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

#### 2.1.1.1 Opening

Note that in the above example, the _FileOutputStream_ object is an anonymous argument.  It cannot be accessed except by the _PrintWriter_ object.  

**The purpose of the _FileOutputStream_ class is to connect a class that outputs to a stream, such as PrintWriter (the class that outputs to a stream), to a particular file in the filesystem.**


Some key concepts to differentiate:
+ FileOutputStream class: act as connector
+ PrintWriter class: act as the printer that outputs to a output stream
+ OutPutStream: a sequence of data flow out of a program

> The process of connecting an output stream to a file is called opening the file (for writing).

#### 2.1.1.2 Exceptions
When a text file is opened in this way, a _FileNotFoundException_ can be thrown.  In this context it actually means that the file could not be created.  

>The name was chosen because this type of exception can also be thrown when a program attempts to open a file for reading and there is no such file, and reading is more common than writing.

It is therefore necessary to enclose this code in exception handling blocks.

+ The file should be opened inside a try block

+ A catch block should catch and handle the possible exception

+ The variable that refers to the PrintWriter object should be declared outside the block (and initialized to null) so that it is not local to the block

:question: go back here after checking all materials

Exercise: Try to run the above code.  Which method throws the error?  Fix the code by catching the exception (and no other exceptions).  The exception is defined in java.io.FileNotFoundException.  In the catch block, print the error message "Could not open example.txt for writing" and exit with exit code 1.  Note that the error message says quite clearly what the problem is: it mentions the file name, and the fact that it is writing, not reading, that is not possible.

Exercise: Then run your new code and check that the expected output file is created, and contains the expected text.

[Demo: binary_writing](UniMelb/binary_writing.java)

#### 2.1.1.3 Closing

When a program is finished writing to a file, it should always close the stream connected to that file.

```java
outputStreamName.close();
```

This allows the system to release any resources used to connect the stream to the file. If the program does not close the file before the program ends, Java will close it automatically, but it is safest to close it explicitly as soon as the writing is finished. 

> If the system crashes while the file is open, then it may be left in an "inconsistent" state, which means that it won't be able to be read when the computer reboots or, worse, it may contain corrupted data.  Keeping the file open also means that other programs, such as system updates, cannot access the file.  That is a common reason for an annoying reboot to be required when updating or installing new software.


### 2.1.2 Buffered writing
Output streams connected to files are usually buffered.

Rather than physically writing to the file as soon as possible, the data is saved in a temporary location (buffer).   When enough data accumulates, or when the method **flush** is invoked, the buffered data is written to the file all at once.  

> This is more efficient, since there is usually a significant overhead for each physical write that doesn't depend on the size of the write.
> + For hard drives, that is the time it takes for the disk to spin to the right location and the read/write head to get to the right track
> + For SSDs, it is a wear-and-tear overhead.  There is a limit to the number of times each block in an SSD can be written to.  In a simple system, writing a single byte involves reading a block into memory, changing one byte and then writing the block back.

#### Close and flush

The method **close** invokes the method **flush**, thus ensuring that all the data is written to the file.

If a program relies on Java to close the file, and the program terminates abnormally, then any output that was buffered may not get written to the file.  Also, if a program writes to a file and later reopens it to read from the same file, it will have to be closed first anyway (write --> close --> reopen --> read).

> The sooner a file is closed after finishing writing to it, the less likely it is that there will be a problem.

### 2.1.3 File names

The rules for how file names should be formed depend on a given operating system (OS), not Java. When a file name is given to a java constructor for a stream, it is just a string, not a Java identifier (e.g., "fileName.txt").  Any suffix used, such as .txt has no special meaning to a Java program.

#### Referencing of a file
Just as a java object can have multiple references to it, a file can be referred to in multiple ways:
+ It has a real file name used by the operating sytem
+ When it is open, it is referred to by the stream that is connected to the file.

> Note:
> Depending on the OS, multiple programs can have read streams connected to the file.  **It is even possible (though rare) for one program to have multiple _read streams_ connected to the file.  However, only one stream can be connected for _writing_.**

#### FileOutputStream
The class **FileOutputStream** is used to create a stream, and connect it to the file with the specified OS file name.  

The stream "name" is only a temporary name for the file, while the program is running and the file is open.  If it is closed and reopened, then the old stream object is destroyed and a new stream object is created.

### 2.1.4 Exceptions

#### Checked Exceptions related to file I/O
In slide "Writing to a text file", we met the FileNotFoundException. When performing file I/O there are many situations in which this or another exception may be thrown.

Many of these exception classes are subclasses of the class IOException. The class IOException is the root class for a variety of exception classes having to do with input and/or output.

These exception classes are all checked exceptions.  Therefore, they must be caught or declared in a throws clause for the program to compile.

#### Unchecked Exceptions related to file I/O
In contrast to these checked exceptions, there are many unchecked exceptions, such as:
+ NoSuchElementException
+ InputMismatchException
+ IllegalStateException

> Your code will compile even if unchecked exceptions are neither caught nor declared in a throws clause, but if they occur and are not caught then your code will crash.

#### Pitfall: a try block limits the scope of a variable
Watch for the scope of a block!

Since opening a file can result in an exception, it should be placed inside a try block.

If the variable for a **PrintWriter** object needs to be used outside that block, then the variable must be declared outside the block.  Otherwise it would be local to the block, and could not be used elsewhere;  If it were declared in the block and referenced elsewhere, the compiler will generate a message indicating that it is an undefined identifier.

This is not specific to file I/O, but that is a common case in which this pitfall arises.

### 2.1.5 Appending text to a file

To create a PrintWriter object and connect it to a text file for appending, a second argument, set
to true, must be used in the constructor for the FileOutputStream object.

```java
outputStreamName = new PrintWriter(new FileOutputStream(FileName, true));
// second argument of FileOutputStream constructor true, indicates we want to append the file           
```

After this statement, the methods print, println and/or printf can be used to write to the file.  The new text will be written after the old text in the file.


## 2.2 Reading from a text file




# 3. Binary files
