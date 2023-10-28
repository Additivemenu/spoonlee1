package javaCore.chap3.UniMelb.Array;


// =========================================================
public class varArrayMain{
    static public void main (String[] args) {
        int max = 10;
        varArray array = new varArray(); // array length here is 0

        // Fill up the array, in order
        for (int i = 0; i < max; i++) {

            array.put(i, i); // in loop i, we would like to put i on array[i]
            System.out.println("loop"+i+ ", array length is:"+array.length);

            // for array content
            for (int j = 0; j<=i; j++){
                System.out.print(array.get(j)+"  ");
            }
            System.out.println();

            // for subscript
            for (int j = 0; j< array.length; j++){
                System.out.print(j+", ");
            }

            System.out.println();
            System.out.println();
        }

       System.out.println();

       System.out.println ("To fill an array of " + max
            + " elements required " + varArray.elementsReallocated()
            + " reallocations,");
        System.out.println("which is about "
            + (double)varArray.elementsReallocated()/max + " each.");

    }
}

// customized dynamic array ========================================================
class varArray {

    // fields--------------------------------------------------------------------------------------
    static int realloc = 0;  // count the number of elements being copied into temporary array
    static int elementsReallocated () { // static method to access static field, invoke varArray.elemebtsReallocated() to call it
        return realloc;
    }

    int [] array; // watch it, varArray class contains a class type variable (array stores the value of an address)
    public int length;

    // constructor----------------------------------------------------------------------------------
    varArray () {
        length = 0;   // length by default constructor is 0
        array = new int[length];
    }

    // methods---------------------------------------------------------------------------------------

    // put val on array[idx], if idx exceed array length, then expand the array
    void put (int idx, int val) {

        if (idx >= length) {
            // What happens if you change this to
            length=Math.max(idx+1, 2*length); // expand the original array
            //length = idx + 1;

            int[] tmp = new int [length];
            for (int j = 0; j < array.length; j++) {
                tmp[j] = array[j];
                realloc++;
            }
            tmp[idx] = val;

            array = tmp; // make array point to newly create array tmp
        } else{

            array[idx] = val;
        }
    }

    // retrieve the element with index = idx
    int get (int idx) {
        if (idx < length) { // legal operation
            return array[idx];
        } else {    // illegal operation
            System.err.println("Accessing element "
            + idx + " of array of size " + length);
            System.exit(1);
            // never called
            return (0);
        }
    }
}
