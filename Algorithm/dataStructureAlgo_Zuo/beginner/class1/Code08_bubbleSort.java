public class Code08_bubbleSort {
    
    public static void swap(int[] arr, int i, int j){ // swap the value of arr[i] and arr[j]
        int tmp = arr[j];
        arr[j] = arr[i];
        arr[i] = tmp; 

    }
    
    public static void printArray(int[] arr){
        for(int i=0; i<arr.length; i++){
            System.out.print(arr[i]+" ");

        }
        System.out.println();

    }
    // bubble sort
    public static void bubbleSort(int[] arr){
        if(arr == null || arr.length < 2 ){  // boundary condition
            return;
        }

        int N = arr.length;
        // 0 ~ N-1
        // 0 ~ N-2
        // 0 ~ N-3
        for(int end = N-1; end>0; end--){     // end is the right bound of array that we are handling

            for(int i = 0; i < end; i++){ // i is the pointer goes from left bound to right bound of interested array for individual pair checking
               if(arr[i+1] < arr[i])
                swap(arr, i+1, i);
                  
            }
        }
    }


    public static void main(String[] args){
        int[] arr = {7, 1, 3, 5, 1, 6, 8, 1, 3, 5, 7, 5, 6};
        printArray(arr);
        bubbleSort(arr);
        printArray(arr);
    } 


}
