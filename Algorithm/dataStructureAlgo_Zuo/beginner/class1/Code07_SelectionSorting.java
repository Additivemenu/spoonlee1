public class Code07_SelectionSorting {
    
    public static void selectSort(int[] arr){
        if(arr == null || arr.length < 2 ){  // boundary condition
            return;
        }

        int N = arr.length;
        // 0 - N-1
        // 1 ~ N-1
        // 2 ~ N-1
        for(int i = 0; i<N; i++){     // i is the left bound of array that we are handling
            int minValueIndex = i;  // 
            for(int j = i+1; j<N; j++){ // j is the pointer goes from left bound to right bound of interested array for individual checking
                minValueIndex = arr[j] < arr[minValueIndex]? j : minValueIndex;  // get the index of min element, the soul of this algorithm
            }
            swap(arr, i, minValueIndex);
        }
    }


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

    public static void main(String[] args){
        int[] arr = {7, 1, 3, 5, 1, 6, 8, 1, 3, 5, 7, 5, 6};
        printArray(arr);
        selectSort(arr);
        printArray(arr);
    } 


}
