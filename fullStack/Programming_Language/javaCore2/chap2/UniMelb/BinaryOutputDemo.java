package javaCore2.chap2.UniMelb;

import java.io.ObjectOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;


public class BinaryOutputDemo
{
	public static void main(String[] args)
	{
		ObjectOutputStream outputStream = null;
		String filename = "numbers.dat";

		try
		{
			outputStream = new ObjectOutputStream(new FileOutputStream(filename));

			int i;
			for(i=0; i<10; i++)
				outputStream.writeInt(i);

			System.out.println("Numbers written to: " + filename);
			outputStream.close();
		}
		catch (IOException e)
		{
			System.out.println("Could not write to file: " + filename);
			System.exit(0);
		}
	}
}