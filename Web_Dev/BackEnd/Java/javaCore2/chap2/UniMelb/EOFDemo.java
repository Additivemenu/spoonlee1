package javaCore2.chap2.UniMelb;

import java.io.ObjectInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.EOFException;

public class EOFDemo {

	public static void main(String[] args) {

		// step0: 声明reading object
		ObjectInputStream inputStream = null;
		String filename = "numbers.dat";	// predefine binary file contains {0,1,2,3,4,5,6,7,8,9}

		try {
			// step1: opening (we normally put this inside a try block)
			inputStream = new ObjectInputStream(new FileInputStream(filename));

			int number;
			System.out.println("Reading numbers from file: " + filename);

			// step2: 正式read
			try {
				while(true) {	// throw EOFexception when reading exceeds the end
					number = inputStream.readInt();
					System.out.println(number);
				}
			}
			catch (EOFException e) {	
				System.out.println("No more numbers in file.");
			}

			// step 3: closing
			inputStream.close();

		} catch (FileNotFoundException e)	// more specific exception comes first
		{
			System.out.println("Could not open file: " + filename);
		} catch(IOException e) {			// more general exception comes subsequently
			System.out.println("Could not read from file.");
		}
	}
}
