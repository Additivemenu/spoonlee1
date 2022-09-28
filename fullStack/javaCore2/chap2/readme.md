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

[more example of PrintWriter](https://www.programiz.com/java-programming/printwriter)

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

### 2.1.5 :star: Practice: Appending text to a file

To create a PrintWriter object and connect it to a text file for appending, a second argument, set
to true, must be used in the constructor for the FileOutputStream object.

```java
outputStreamName = new PrintWriter(new FileOutputStream(FileName, true));
// second argument of FileOutputStream constructor true, indicates we want to append the file           
```

After this statement, the methods print, println and/or printf can be used to write to the file.  The new text will be written after the old text in the file.


### 2.1.6 Useful methods for text file output



#### about constructor of PrintWriter

1. Normal constructor
    ```java
    public PrintWriter(OutputStream streamObject)
    ```
    This is the only constructor you are likely to need.  There is no constructor that accepts a file name as an argument. 

2. Constructor that creates a stream using a file name
    If you want to create a stream using a file name, you use
    ```java
    new PrintWriter( new FileOutputStream(fileName));
    ```
    When the constructor is used in this way, a blank file is created.  If there already was a file named fileName, then the old contents of the file are lost. 

3. Constructor for appending the file
    If you want instead to append new text to the end of the old file contents, use
    ```java
    new PrintWriter( new FileOutputStream(fileName, true));
    ```

    When used in either of these ways, the _FileOutputStream_ constructor, and so the _PrintWriter_ constructor invocation, can throw a _FileNotFoundException_, which is a kind of _IOException_.


    >了解:
    > If you want to create a stream object using an object of the class File, you can use a File object in place of the fileName.  (The File class is covered in Section 10.3 of the text book.  It is mentioned here so that you will have a more complete reference in this slide, but you can ignore the reference to the class File until after you've read that section.)

#### useful methods of PrintWriter

```java
public void println(argument)
```
+ The argument can be a string, character, integer, floating-point number, boolean value, or any combination of these, connected with + signs.  (Note that each of these types is converted to a string, and the + is simple string concatenation.  If you use println(2+2), you will get 22.  To get 4, use println((2+2)).) 

+ The argument can also be any object, although it will not work as desired unless the object has a properly defined toString() method.  

+ The argument is output to the file connected to the stream.  After the argument has been output, the line ends, and so the next output is sent to the next line.

```java
public void print(argument)
```
This is the same as println, except that this method dos not end the line, so the next output will be on the same line.

```java
public PrintWriter printf(arguments)
```
This is the same as System.out.printf, except that this method sends output to a text file rather than to the screen.

```java
public void close()
```
Closes the stream's connection to a file.  This method calls flush before closing the file.

```java
public void flush()
```
Flushes(清洗) the output stream.  This forces an actual physical write to the fiel of any data that has been buffered and not yet physically written to the file.  Normally, you should not need to invoke flush.  It is useful, for example, if some other program is reading from the file as it is being written.

## 2.2 :full_moon: Reading from a text file
### 2.2.1 :star: Scanner for reading text file
The class Scanner can be used for reading from a text file as well as reading from the keyboard. Simply replace the argument System.in (to the Scanner constructor) with a suitable stream that is connected to the text file.
```java
Scanner StreamObject = new Scanner(new FileInputStream(FileName));
```

[Demo: textScannerReading](UniMelb/TextFileScannerDemo.java)
总结, 打印分四步:
step0: 声明打印机
step1: 连接打印机和纸 (有可能出现Exception, 比如这个纸不存在)
step2: 正式打印
step3: 关闭打印机


### 2.2.2 :star: Testing for the end of a text file with Scanner
A program that tries to read beyond the end of a file using methods of the Scanner class will cause an exception to be thrown.

However, instead of having to rely on an exception to signal the end of a file, the Scanner class provides methods such as hasNextInt and hasNextLine. These methods can also be used to check that the next token to be input is a suitable element of the appropriate type.

在读取的过程中, 设想有一个cursor也随着.nextLine(), .nextInt()移动

[Demo: hasNextLineDemo](UniMelb/HasNextLineDemo.java)


[Demo: hasNextIntDemo](UniMelb/HasNextIntDemo.java)


### 2.2.3 Methods in the class Scanner
[Resource: Scanner class docs by Oracle](https://docs.oracle.com/javase/7/docs/api/java/util/Scanner.html)

#### Constructor
1. Normal Scanner constructor
```java
public Scanner (InputStream streamObject)
```
There is no constructor that accepts a file name as an argument.

2. If you want to create a stream using a file name you can use
```java
new Scanner(new FileInputStream(fileName))
```
When used in this way, the FileINputStream constructor, and thus the Scanner constructor invocation, can throw a FileNotFoundException, which is a kind of IOException.

3. To create a stream connected to the keyboard, use
```java
new Scanner(System.in)
```

4. File object as argument
```java
public Scanner(File fileObject)
```
The File class will be covered later in this lesson.  It is mentioned here only so that you will have a more complete reference here, butyou can ignore this entry until after you have read that section.

If you want to create a stream using a file name, you can use
```java
new Scanner(new File(fileName))
```
#### Methods
Many inherent methods in Scanner can throw Exceptions by themselves

+ NextInt()

    ```java
    public int nextInt()
    ```
    Returns the next token as an int, provided the next token is a well-formed string representation of an int.

    + Throws a NoSuchElementException if there are no more tokens.

    + Throws an InputMismatchException if the next token is not a well-formed string representation of an int.

    + Throws an IllegalStateException if the Scanner stream is closed.

    ```java
    public boolean hasNextInt()
    ```
    Returns true if the next token is a well-formed string representation of an int; otherwise returns false.

    + Throws an IllegalStateException if the Scanner stream is closed.

    ```java
    // similar methods
    public long nextLong()
    public boolean hasNextLong()

    public byte nextByte()
    public boolean hasNextByte()

    public short nextShort()
    public boolean hasNextShort()

    public double nextDouble()
    public boolean hasNextDouble()

    public float nextFloat()
    public boolean hasNextFloat()

    public boolean nextBoolean()
    public boolean hasNextBoolean()
    ```
+ next()
    ```java
    public String next()
    ```
    Returns the next token(暂时将the next token理解为一个单位的word; int, double...都算一个token).

    + Throws a NoSuchElementException if there are no more tokens.

    + Throws an IllegalStateException if the Scanner stream is closed.

    [Demo: next()](https://www.javatpoint.com/post/java-scanner-next-method)

    ```java
    public boolean hasNext()
    ```
    Returns true if there is another token.  It may wait for a next token to enter the stream.

    + Throws an IllegalStateException if the Scanner stream is closed.

    [Resource: hasNext()](https://www.tutorialspoint.com/java/util/scanner_hasnext.htm)
+ NextLine()
    ```java
    public String nextLine()
    ```
    Returns the restu of the current inptu line.  Note that the line terminator '\n' is read and discarded; it is not included in the string returned.

    + Throws a NoSuchElementException if there are no more lines.

    + Throws an IllegalStateException if the Scanner stream is closed.

    ```java
    public boolean hasNextLine()
    ```
    Returns true if there is a next line.  It may wait for a next line to enter the stream.

    + Throws an IllegalStateException if the Scanner stream is closed.

+ Delimiter(了解)
    ```java
    public Scanner useDelimiter(String newDelimiter)
    ```
    > The above methods often mention a "token".  A token is the string between a pair of delimiters (or between the start of the file and the first delimiter, or the last delimiter and the end of file).

    This function changes the string that acts as the delimiter that separates tokens (words or numbers).  It replaces the previous value.  See the subsection "Other Input Delimiters" in Chapter 2 of the text book for the details.  (You can use this method to set the delimiters to a mor complex pattern than just a single string, but we are not covering that.)

    Returns the calling object, but it is usually used as if it were a void method.

### 2.2.4 Reading from a text file using Buffered Reader

...

## 2.3 其他补充
### 2.3.1 Path names
When a file name (i.e., with no '/' or '\' characters) is used as an argument to a constructor for opening a file, _it is assumed that the file is in the same directory or folder as the one in which the program is run._

A path name not only gives the name of the file, but also the directory or folder in which the file exists.
+ A full path name gives a complete path name, starting from the root directory
  + An absolute path name starts with either a slash ('/' or '\'), or a drive specifier followed by a slash ("C:\").
+ A relative path name gives the path to the file, starting with the directory from which the program was run.
  + A relative path name starts either with a './' **for the current directory**, a '../' **for the parent of the current directory**, or a directory name denoting a subdirectory of the current directory.

#### OS
The way path names are specified depends on the operating system.

+ In Unix-like systems (e.g., MacOS, Linux), directory names are separated by a forward slash, '/'.  A typical path name that could be used as a file name argument is "/user/sallyz/data/data.txt".

    A BufferedReader input stream connected to this file is created as follows:
    ```java
    BufferedReader inputStream = new BufferedReader(new FileReader("/user/sallyz/data/data.txt"));
    ```

+ The Windows operating system uses a backslash '\' to separate path components, and optionally has a drive specifier at the start. A typical Windows path name is "C:\dataFiles\goodData\data.txt".

    A BufferedReader input stream connected to this file is created as follows:

    ```java
    BufferedReader inputStream = new BufferedReader(new FileReader ("C:\\dataFiles\\goodData\\data.txt"));
    ```

    > Note:
    > that a Windows pat must use \\ in place of \, since a single backslash denotes an the beginning of an escape sequence.  This is part of the process of parsing the .java file to convert it to a .class file.  It does not apply to file names read from a file, such as the keyboard, or to file names constructed some other way.
    > Problems with escape characters can be avoided altogether by always using Unix conventions when writing a path name.  A Java program will accept a path name written in either Unix or Windows format, regardless of the OS on which it is run.  This is one of the ways in which Java attempts to be platform-independent.


### 2.3.2 Nested constructors (先做了解)
Each of the Java I/O library classes serves only one function, or a small number of functions.  Normally two or more class constructors are combined to obtain full functionality. Therefore, expressions with two constructors are common when dealing with Java I/O classes.

```java
new BufferedReader(new FileReader("stuff.txt"))
```

Above, the anonymous FileReader object establishes a connection with the stuff.txt file.  However, it provides only very primitive methods for input.  For example, it is responsible for handling different file encodings (UTF-8, UTF-16, BIG5 etc.)

The constructor for _BufferedReader_ takes this FileReader object and adds a richer collection of input methods. **This transforms the inner object into an instance variable of the outer object.**

#### Standard input, standard output, standard error
Unix-like operating systems and Windows attach three standard streams to any running program. Java's access to these three streams is through System.out, System.err and System.in.

+ Standard output is used for normal output.  By default it goes to the screen, but it can be "redirected" to a file using "java Prog > dest_file".

+ Standard error is used to output error messages.  By default it also goes to the screen, and even if standard output is redirected, standard error still goes to the screen.  On Unix-like systems, standard error can also be redirected using "java Prog 2>& dest_file"

+ Standard input is normally used for keyboard input.  However, it can be redirected to come from a file using "java Prog < intput_file".  More powerfully, it can use the output of another program.  The command "java Prog1 | java Prog2" takes the standard output of running Prog1 and uses it as the standard input of Prog2.  This is called a "pipe", and Unix shell scripts often have chains of half a dozen piped commands.


#### Redirect streams
As well as the redirection from the command line described above, it is possible to redirect the streams in System using the following methods:
```java
public static void setOut(PrintStream outStream)
public static void setErr(PrintStream outStream)
public static void setIn(InputStream inStream)
```
Using these methods, any of the three standard streams can be redirected.  For example, instead of appearing on the screen, error messages could be redirected to a file.

In order to redirect a standard stream, a new stream object is created. Like other streams created in a program, a stream object used for redirection should be closed after I/O is finished.

Note, standard streams do not need to be closed.

Redirecting System.err:

```java
public void getInput() {
    //. . .
    PrintStream errStream = null;
    try {
        errStream = new PrintStream(new FileOuptputStream("errMessages.txt"));
        System.setErr(errStream);
        //. . . Set up input stream and read
    } catch(FileNotFoundException e) {
        System.err.println("Input file not found");
    } finally {
        // . . .
        errStream.close();
    }
}
```
This is useful if we sometimes want to send the output to the operating system's standard error and sometimes want to send it to a file.  We can either call or not call the setErr depending on a configuration variable.


#### What have these got to do with nested constructors?
System.in, System.out and System.err are low-level I/O streams.  Being able to mix-and-match different sources of streams-of-character, we can use different classes on top of these special streams.  Other low-level streams come from networking, and again we get to choose which skin to apply on top of a network connection.

### 2.3.3 :star: File class
The File class is like a wrapper class for file names.

The constructor for the class File takes a name (known as the abstract name) as a string argument, and produces an object that represents the file with that name.

The File object and methods of the class File can be used to determine information about the file and its properties.

[Demo: file class](UniMelb/FileClassDemo.java)

Exercise: Modify the example above to ask for a new file name, and then rename it just before exiting.

Exercise: Modify the example above to check if the file name entered contains "/" or "\".  If so, check if the directory exists and create it if necessary before creating the file.


#### Some methods in class File

```java
public File (String fileName)
```
Constructor.  fileName can be either a full or a relative path name (which includes the case of a simple file name).  fileName is referred to as the abstract path name.

[Resource: File class docs by Oracle](https://docs.oracle.com/javase/7/docs/api/java/io/File.html)

```java
public boolean exists()
```

```java
public boolean canRead()
```

```java
public boolean setReadOnly()
```

```java
public boolean canWrite()
```

```java
public boolean delete()
```

```java
public boolean createNewFile() throws IOException
```

```java
public String getName()
```

```java
public String getPath()
```

```java
public boolean renameTo (File newName)
```

```java
public boolean isFile()
```

```java
public boolean isDirectory()
```

```java
public boolean mkdir()
```

```java
public boolean mkdirs()
```

```java
public long length()
```

# 3. Binary files
