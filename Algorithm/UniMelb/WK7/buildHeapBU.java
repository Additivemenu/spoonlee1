import javax.print.event.PrintJobListener;

// build a heap bottom-up
// to check if arr[k] = v should be placed inside else statement or after while loop
// answer: results are the same, but place it inside else statement is more intuitive 


public class buildHeapBU{
    public static void main(String[] args)
    {
        int[] arr1 = {0, 2,9,7,6,5,8,3};  // arr1[0] should contain nothing
        System.out.println("Original array is: ");
        printArr(arr1);

        int[] heap1 = BottomUp(arr1);
        System.out.println("===========================");
        System.out.println("The final array is: ");
        printArr(heap1);
    }

    // build a heap Bottom-Up -------------------------------------------------
    // reorder array to make it satisfy parental dominance
    public static int[] BottomUp(int[] arr){

        int n = arr.length;  

        int k,j;
        int v;
        boolean heap;

        for (int i = (n-1)/2; i>=1; i--){           // loop over parent node starting the last one (expected loop n/2 times)

            k = i;                              // k is parent node index
            v = arr[k];                         // record parent value
            heap = false;

            // show array at the start of a for loop
            System.out.println("===========================");
            System.out.println("i="+i+" start: ");
            printArr(arr);
            markSlidingWindow(arr, k);
            System.out.println("k: "+k+ ", v: "+v);
            System.out.println("----------------------------");

            while (!heap && 2*k <= n-2){        // 2*k needs to be less than n-2 to ensure not exceed array bound
                j = 2*k;                        // j is left child index

                // determine the larger child
                if (j < n-1){
                    if (arr[j] < arr[j+1]){
                        j=j+1;                  // j points to the largest child
                    }
                }

                System.out.println("k: "+k+ ", v: "+v);

                if(v>=arr[j]){                  // is a heap, then end while loop, process to next parent node
                    heap = true;
                }else{                          // not a heap: parent smaller than largest child --> swap value between parent and largest child
                    arr[k] = arr[j];            // then process to next while loop (let illegal parent to slip down the tree)
                    k=j;
                    arr[k] = v;                 // my proposal
                }

                // show array after potential swap ------
                System.out.println("i="+i+" heap: " + heap);
                printArr(arr);
                markSlidingWindow(arr, k);

                // System.out.println(heap);
            } // end of while loop---

            //arr[k] = v;                         // class material

            // show array at the end of a for loop
            System.out.println("-------------------------");
            System.out.println("i="+i+" end: ");
            printArr(arr);
            markSlidingWindow(arr, k);

        } // end of for loop------

        return arr;
    }

    // helper function ------------------------------------------------
    public static void printArr(int[] arr){
        
        for (int ele:arr){
            System.out.print(ele + ", ");
        }

        System.out.println();

        for (int i = 0; i<arr.length;i++){
            System.out.print(i+ "  ");
        }

        System.out.println();

    }

    public static void markSlidingWindow(int[] arr, int k){

        for (int mark = 0; mark < arr.length; mark++){
            if (mark==k){  // mark down parent 
                System.out.print("k  ");
            }else if(mark == 2*k ){ // mark down child
                System.out.print("j  ");
            }else if ( mark==2*k+1){
                System.out.print("j+1");
            }else{
                System.out.print("   ");
            }
        }
        System.out.println();
    }



} 