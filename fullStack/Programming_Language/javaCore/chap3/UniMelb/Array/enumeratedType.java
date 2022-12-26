package javaCore.chap3.UniMelb.Array;

import java.util.Scanner;

public class enumeratedType {
    enum Flavour {VANILLA, CHOCOLATE, strawberry};

    public static void main (String[] args) {
        Flavour favourite = null;
        Scanner keyboard = new Scanner(System.in);

        System.out.println("What is your favourite flavour?");
        for (Flavour f : Flavour.values())
            System.out.print(" " + f);
        System.out.println();

        String answer = keyboard.next();
        favourite = Flavour.valueOf(answer);

        switch (favourite) {
            case VANILLA:
                System.out.println("Classic");
                break;
            case CHOCOLATE:
                System.out.println("Rich");
            default:
                System.out.println("I bet you said strawberry.");
                break;
        }
    }
}
