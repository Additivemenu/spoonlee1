public class Code10_insetSortRecurs {

    
    public static void main(String[] args){
        int[] arr = {3,1,6,4,2,3};
        printArray(arr);
        insertSort1(arr,0,0);
        printArray(arr);
    } 


    // insert sorting-------------------------------------------------------------
    public static void insertSort1(int[] arr, int leftB, int rightB){
        
        // exclude Bcs:
        if(arr == null || arr.length < 2 ){  // boundary condition
            return;
        }

        // sort out
        // 0~0
        // 0~1
        // 0~2
        // ...
        // 0~(N-1)
        if (rightB == arr.length - 1) // end recursive when right bound hits the last index of arr 
            System.out.println("complete!");

        else if (arr[rightB] > arr[rightB+1]) { // make the processing unit sorted
            swap(arr, rightB, rightB+1);

            int currentIndex=rightB;
            while(currentIndex>=1 && arr[currentIndex-1 ] > arr[currentIndex]){
                swap(arr, currentIndex, currentIndex-1);
                currentIndex--;
            }
            

            insertSort1(arr, leftB, rightB+1); // move to the next processing unit
        }

        else 
            insertSort1(arr, leftB, rightB+1); // move to the next processing unit


    }


    // swap the value of arr[i] and arr[j]
    public static void swap(int[] arr, int i, int j){ 
        int tmp = arr[j];
        arr[j] = arr[i];
        arr[i] = tmp; 

    }
    
    //
    public static void printArray(int[] arr){
        for(int i=0; i<arr.length; i++){
            System.out.print(arr[i]+" ");

        }
        System.out.println();

    }

}
