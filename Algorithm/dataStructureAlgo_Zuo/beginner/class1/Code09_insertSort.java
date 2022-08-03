public class Code09_insertSort {
    
    public static void main(String[] args){
        int[] arr = {7, 1, 3, 5, 1, 6, 8, 1, 3, 5, 7, 5, 6};
        printArray(arr);
        insertSort1(arr);
        printArray(arr);
    } 

    // insert sorting---------------------------------------------------------
    public static void insertSort1(int[] arr){
        if(arr == null || arr.length < 2 ){  // boundary condition
            return;
        }

        // 0~0
        // 0~1
        // 0~2
        // ...
        // 0~(N-1)
        int N = arr.length;
        for(int end =1; end<N; end++){
            //--------------using while loop--------------------
            //int currentIndex = end; // the slot of interest

            // while(currentIndex-1 >=0 && arr[currentIndex-1] > arr[currentIndex]){
            //     swap(arr, currentIndex-1, currentIndex);
            //     currentIndex--;
            // }

            //-------------using for loop is also ok-----------------
            for( int currentIndex = end; currentIndex >=1 && arr[currentIndex-1] > arr[currentIndex] ;currentIndex-- ){
                swap(arr, currentIndex-1, currentIndex);
            }

        }

    }

    // swap the value of arr[i] and arr[j]
    public static void swap(int[] arr, int i, int j){ 
        int tmp = arr[j];
        arr[j] = arr[i];
        arr[i] = tmp; 

    }
    
    public static void printArray(int[] arr){ //
        for(int i=0; i<arr.length; i++){
            System.out.print(arr[i]+" ");

        }
        System.out.println();

    }

}
