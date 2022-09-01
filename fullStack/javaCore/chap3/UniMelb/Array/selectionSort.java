package UniMelb.Array;

public class selectionSort {
    /**
    Precondition: count <= a.length;
    The first count indexed variables have
    values.
    Action: Sorts a so that a[0] <= a[1] <=
    ... <= a[count - 1].
    */
    public static void sort(double[] a, int count)
    {
       int index, indexOfNextSmallest;
        for (index = 0; index < count - 1; index++)
        {//Place the correct value in a[index]:
            indexOfNextSmallest =
                indexOfSmallest(index, a, count);
            interchange(index,indexOfNextSmallest, a);
            //a[0]<=a[1]<=...<=a[index] and these are
            //the smallest of the original array
            //elements. The remaining positions contain
            //the rest of the original array elements.
        }
    }

    /**
    Returns the index of the smallest value among
    a[startIndex], a[startIndex+1], ...
    a[numberUsed - 1]
    */
    private static int indexOfSmallest(int startIndex, double[] a, int count)
    {
        double min = a[startIndex];
        int indexOfMin = startIndex;
        int index;
        for (index = startIndex + 1;
            index < count; index++)
        if (a[index] < min)
        {
            min = a[index];
            indexOfMin = index;
            //min is smallest of a[startIndex] through
            //a[index]
        }
        return indexOfMin;
    }

    /**
    Precondition: i and j are legal indices for
    the array a.
    Postcondition: Values of a[i] and a[j] have
    been interchanged.
    */
    private static void interchange(int i, int j, double[] a)
    {
        double temp;
        temp = a[i];
        a[i] = a[j];
        a[j] = temp; //original value of a[i]
    }

    public static void main (String[] arg) {
        double[] a = {6,2,3,6,2,3,4,1};

        sort (a, a.length);

        for (double element : a)
            System.out.print(" " + element);
        System.out.println("");
    }
}
