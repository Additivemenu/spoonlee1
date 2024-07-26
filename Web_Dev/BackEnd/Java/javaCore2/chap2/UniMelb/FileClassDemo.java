package javaCore2.chap2.UniMelb;

import java.util.Scanner;
import java.io.File;
import java.io.PrintWriter;
import java.io.FileOutputStream;
import java.io.FileNotFoundException;


/**
 * file class, used to control file
 * (remember the disastrous Java final project due to the absence of file class)
 */

 
public class FileClassDemo
{

	public static void main(String[] args)
	{	

		Scanner console = new Scanner(System.in);

		String line = null;
		String filename = null;

		System.out.println("Enter a line of text to store:");
		line = console.nextLine();

		System.out.println("Enter a filename you would like to write to:");
		filename = console.nextLine();

		// create a file object ---------------------------------------------------------------
		File fileObject = new File(filename);

		while(fileObject.exists())			// avoid created repeated file object
		{
			System.out.println(filename + " already exists. Enter a different filename:");
			filename = console.nextLine();
			fileObject = new File(filename);
		}
		// up here, a file is created 

		// output step0: 声明打印机 ------------------------------------------------------------
		PrintWriter outputStream = null;

		try
		{	
			// output step1: 连接打印机和纸
			outputStream = new PrintWriter(new FileOutputStream(filename));
		}
		catch (FileNotFoundException e)
		{
			System.out.println("Could not write file: " + filename);
			System.exit(0);
		}
		// output step2: 正式打印
		outputStream.println(line);
		// output step3: 关闭打印机
		outputStream.close();

		System.out.println("Line written to: " + filename);
	}

}