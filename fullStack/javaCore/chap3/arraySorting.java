import java.util.*;

public class arraySorting {
    public static void main(String[] args)
    {   
        int maxLen = 10;
        int maxValue = 99;
        int[] testArr = generateRandomArray(maxValue, maxLen);
        System.out.println(Arrays.toString(testArr));   

        Arrays.sort(testArr); // sort array using quick sorting algorithm
        System.out.println(Arrays.toString(testArr)); 

    }


    // generate a random array for test
    public static int[] generateRandomArray(int maxValue, int maxLen){
        int len = (int)(Math.random()*maxLen); // make a random index between 0 and (maxLen-1)

        int[] arr = new int[len];

        for(int i=0; i < len; i++)
        {
            arr[i] = (int)(Math.random()*maxValue);
        }

        return arr;
    }
}
