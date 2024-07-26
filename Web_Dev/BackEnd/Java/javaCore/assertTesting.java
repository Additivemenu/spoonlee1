package javaCore;

import java.util.Scanner;

public class assertTesting {
    public static void main(String[] args)
    {
        Scanner keyboard = new Scanner(System.in);
        System.out.println("The menu only lists beer. What would you like?");
        String order = keyboard.nextLine();
        assert order.equals("beer"):" Sorry, mate! Try somewhere else.";  // if assert boolean is false, print what is the " "
        System.out.println("Coming right up.");
    }
}
