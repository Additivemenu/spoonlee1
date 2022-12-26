package javaCore.chap3.UniMelb.Array;

import java.util.Collections;
import java.util.ArrayList;
import java.util.Arrays;

public class collectionSort {

    public static void main(String[] args) {

        // Creates an ArrayList with some initialized values.
        ArrayList<Integer> numbers = new ArrayList<Integer>(Arrays.asList(2, 10, 6, 3, 7));
        System.out.println(numbers);

        // Sorts the list of numbers.
        Collections.sort(numbers);
        System.out.println(numbers);

        // Reverse sorts the list of numbers.
        Collections.sort(numbers, Collections.reverseOrder());
        System.out.println(numbers);

    }

}
