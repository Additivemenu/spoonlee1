package javaCore.chap3.UniMelb.Array;

// 数组扩容, 从length = 0开始, 每次扩充1格, 直到length = 100
// 中间需要创建临时数组来copy原数组

public class partiallyFilledArray {
    public static void main (String[] args) {
        int max = 100;
        int array[] = {};

        // Record how many elements are copied in memory, in total
        int elementsReallocated = 0;

        // Fill up the array, in order
        for (int i = 0; i < max; i++) {

            System.out.println("Current array length is: " + array.length);

            // If the array isn't big enough for element i,
            // then extend it until it is big enough.
            if (i > array.length - 1) {

                int[] tmp = new int [i+1]; // create tmp array with length 1 slot longer than array

                // copy array to tmp
                for (int j = 0; j < array.length; j++) {
                    tmp[j] = array[j];
                    elementsReallocated++; // +1 whenever a element is copied 
                }
                System.out.println("The total num of elements reallocated is "+ elementsReallocated);
                array = tmp; // array and tmp now points to the same array
            }
            array[i] = i * i;
        }

        System.out.println();

        System.out.println ("To fill an array of " + max
            + " elements required " + elementsReallocated
            + " reallocations,");

        System.out.println("which is about "
            + elementsReallocated/max + " each.");
    }
}
