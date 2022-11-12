/**
 Demonstrates sorting arrays for
 classes implement the Comparable interface
*/

// file class ==================================================================================
public class ComparableDemo {
    public static void main(String[] args) {

        // Example 1: numbers ----------------------------------------------------
        Double[] d = new Double[10];        // Double implements Comparable

        // initialized -----------------------------
        for (int i = 0; i < d.length; i++)
            d[i] = d.length - (double)i;
        
        System.out.println("Before sorting:");
        for (double v : d) {
            System.out.print(v + ", ");
        }
        System.out.println();

        // Perform sort ----------------------------
        GeneralizedSelectionSort.sort(d, d.length);

        // Check results ---------------------------
        System.out.println("After sorting:");
        for (double v : d)
            System.out.print(v + ", ");
        System.out.println();

        // Example 2: Strings ----------------------------------------------------
        String[] a = new String[10];
        // initialized ------------------------------
        a[0] = "dog";
        a[1] = "cat";
        a[2] = "cornish game hen";
        int numberUsed = 3;

        System.out.println("Before sorting:");
        for (int i = 0; i < numberUsed; i++) {
            System.out.print(a[i] + ", ");
        }
        System.out.println();

        // Perform sort -------------------------------
        GeneralizedSelectionSort.sort(a, numberUsed);

        // Check results ------------------------------
        System.out.println("After sorting:");
        for (int i = 0; i < numberUsed; i++) {
            System.out.print(a[i] + ", ");
        }
        System.out.println();
    }
}

// ==================================================================================
// includes a method that can sort any partially filled array whose base type implements the Comparable interface
// based on selection sorting 
class GeneralizedSelectionSort {
    /**
     Precondition:  numberUsed < a.length;
                The first numberUsed indexed valuables have values (not null)
        Action: Sorts  a  so that  a[0], a[1], ..., a[numberUsed-1] are in
            increasing order by the compareTo method.
    */
    public static void sort (Comparable[] a, int numberUsed) {  // numberUsed specifies the length of a to be sorted

        int index, indexOfNextSmallest;

        for (index = 0; index < numberUsed - 1; index++) {                  // loop over each elements

            // get the index of min elements on the remaining array position
            indexOfNextSmallest = indexOfSmallest(index, a, numberUsed);    

            interchange (index, indexOfNextSmallest, a);                    // swap a[index], a[indexOfNextSmallest]
            
        }
    }

    /**
     Returns the index of the smallest value among
        a[startIndex], a[startIndex+1], ..., a[numberUsed-1]
    */
    private static int indexOfSmallest (int startIndex, Comparable[] a, int numberUsed) {
        Comparable min = a[startIndex];     // content of min element
        int indexOfMin = startIndex;        // pointer pointing at min element

        int index;

        // compare a[index] with what is left in the array one by one
        for (index = startIndex + 1; index < numberUsed; index++)
            if (a[index].compareTo(min) < 0) { // "if a[index] is less than min" , the core of this code!

                // updates for the next loop
                min = a[index];
                indexOfMin = index;

            }
        return indexOfMin;
    }

    /**
     Precondition: i and j are legal indices for the array a.
        Postcondition: Values of a[i] and a[j] have been swapped.
    */
    private static void interchange (int i, int j, Comparable[] a) {
        Comparable temp;
        temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}

