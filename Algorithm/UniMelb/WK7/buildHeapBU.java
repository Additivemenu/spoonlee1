import javax.print.event.PrintJobListener;

// build a heap bottom-up

public class buildHeapBU{
    public static void main(String[] args)
    {
        int[] arr1 = {0, 2,9,7,6,5,8,3};  // arr1[0] should contain nothing
        System.out.println("Original array is: ");
        printArr(arr1);

        int[] heap1 = BottomUp(arr1);
        System.out.println("The final array is: ");
        printArr(heap1);
    }

    // build a heap Bottom-Up -------------------------------------------------
    public static int[] BottomUp(int[] arr){

        int n = arr.length-1;

         int k,j;
         int v;
         boolean heap;

        for (int i = n/2; i>=1; i--){
            k = i;                              // k is parent index
            v = arr[k];                         // record parent value
            heap = false;

            System.out.println("===========================");

            System.out.println("i="+i+" start: ");
            printArr(arr);

            markSlidingWindow(arr, k);

            while (!heap && 2*k <= n-2){        // 2*k needs to be less than n-2 to ensure not exceed array bound
                j = 2*k;                        // j is left child index

                // determine the larger child
                if (j < n){
                    if (arr[j] < arr[j+1]){
                        j=j+1;
                    }
                }

                if(v>=arr[j]){                  // is a heap
                    heap = true;
                }else{                           // not a heap: parent larger than child
                    arr[k] = arr[j];
                    k=j;
                    arr[k] = v;
                }

                // System.out.println(heap);
            } // end of while loop---

            // arr[k] = v;

            // show process
            System.out.println("i="+i+" end: ");
            printArr(arr);

            markSlidingWindow(arr, k);

        } // end of for loop------

        return arr;
    }

    // helper function --------------------------------------
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
                System.out.print("-  ");
            }else if(mark == 2*k ){ // mark down child
                System.out.print("1  ");
            }else if ( mark==2*k+1){
                System.out.print("2  ");
            }else{
                System.out.print("   ");
            }
        }
        System.out.println();
    }



} 