package UniMelb.Array;


// =========================================================
public class varArrayMain{
    static public void main (String[] args) {
        int max = 10;
        varArray array = new varArray();

        // Fill up the array, in order
        for (int i = 0; i < max; i++) {
            array.put(i, i*i);
        }

       System.out.println ("To fill an array of " + max
            + " elements required " + varArray.elementsReallocated()
            + " reallocations,");
        System.out.println("which is about "
            + (double)varArray.elementsReallocated()/max + " each.");

    }
}

// ========================================================
class varArray {
    static int realloc = 0;
    static int elementsReallocated () {
        return realloc;
    }

    int [] array;
    public int length;

    varArray () {
        length = 0;
        array = new int[length];
    }

    void put (int idx, int val) {
        if (idx >= length) {
            // What happens if you change this to
                length=Math.max(idx+1, 2*length);
            //length = idx + 1;
            int[] tmp = new int [length];
            for (int j = 0; j < array.length; j++) {
                tmp[j] = array[j];
                realloc++;
            }
            array = tmp;
        }
    }

    int get (int idx) {
        if (idx < length) {
            return array[idx];
        } else {
            System.err.println("Accessing element "
            + idx + " of array of size " + length);
            System.exit(1);
            // never called
            return (0);
        }
    }
}
