package javaCore.chap7.UniMelb;

import java.util.Scanner;
import java.util.InputMismatchException;

public class Practice_ExceptionDemo {

  public static void main(String[] args) {

    Scanner keyboard = new Scanner(System.in);

    int[] arr = {1, 2, 3, 4, 5, 6, 0};
    System.out.println("Array index: ");
    
    boolean exit = false;
    int index = 0; 

    while(!exit){
        try{
            index = keyboard.nextInt();

            if(index > arr.length-1){
              throw new ExceedArrayIndexBoundException();
            }

            exit = true;          // only when index is valid 

        }catch(InputMismatchException e){
            System.out.println("Mismatch input! Please enter an integer!");
            keyboard.nextLine();   // to consume the \n you entered  after type in something 
                                  // if you don't do this, the program will enter an infinity loop
        }catch(ExceedArrayIndexBoundException e){
            System.out.println("Catch Error: index is too large! ");
            String message = e.getMessage();
            System.out.println(message);
            keyboard.nextLine(); 
        }

    }

    int value = arr[index];
    System.out.printf("arr[%d] = %d\n", index, value);

    keyboard.close();
  }

}

// customized Exception class
class ExceedArrayIndexBoundException extends Exception {

  // at least these two constructors are needed to define a customized Exception class
  public ExceedArrayIndexBoundException() {
      super("Error: the index entered exceeds the array length! ");
  }

  public ExceedArrayIndexBoundException(String message) {
      super(message);
  }
}