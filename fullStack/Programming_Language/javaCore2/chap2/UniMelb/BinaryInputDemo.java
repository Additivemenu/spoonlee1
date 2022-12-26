package javaCore2.chap2.UniMelb;

import java.io.ObjectOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import java.io.ObjectInputStream;
import java.io.FileInputStream;

public class BinaryInputDemo
{
	public static void main(String[] args)
	{
		ObjectOutputStream outputStream = null;	// for writing
		String filename = "numbers.dat";

		try
		{	
			// writing
			outputStream = new ObjectOutputStream(new FileOutputStream(filename));
			int i;
			for(i=0; i<10; i++)
				outputStream.writeInt(i);

			System.out.println("Numbers written to: " + filename);
			outputStream.close();

			// opening: reading
            ObjectInputStream inputStream
                    = new ObjectInputStream(new FileInputStream(filename));

            for (i = 0; i < 10; i++) {
                System.out.println(inputStream.readInt());
            }

            System.out.println("==========================");
            for (i = 0; i < 10; i++) {
                System.out.println(inputStream.readShort());
            }

            System.out.println("==========================");
            for (i = 0; i < 10; i++) {
                System.out.println(inputStream.readLong());
            }

            inputStream.close();
		}
		catch (IOException e)
		{
			System.out.println("Could not write to file: " + filename);
			System.exit(0);
		}
	}
}