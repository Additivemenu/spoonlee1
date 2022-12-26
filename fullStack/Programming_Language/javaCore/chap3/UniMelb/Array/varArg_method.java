package javaCore.chap3.UniMelb.Array;

public class varArg_method {
     /**
     Returns the largest of any number of int values.
    */
    public static int max (int... arg) {
        int largest = Integer.MIN_VALUE;
        for (int a : arg)
            if (a > largest)
                largest = a;
        return largest;
    }

    public static void main (String[] arg) {
        System.out.println(max (1, 2) + " " + max(4, 6, 3) + " " + max());
    }
}
