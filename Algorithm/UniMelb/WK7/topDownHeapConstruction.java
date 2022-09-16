public class topDownHeapConstruction {
    
    public static void main(String[] args)
    {
        // int[] arr1 = {0, 2,9,7,6,5,8,3};  // arr1[0] should contain nothing
        int[] arr1 = {0, 0,1,2,3,4,5,6,7,8,9};  // arr1[0] should contain nothing
        System.out.println("Original array is: ");
        printArr(arr1);

        int[] heap1 = topDown(arr1);
        System.out.println("===========================");
        System.out.println("The final array is: ");
        printArr(heap1);
    }

    // 
    public static int[] topDown(int[] arr){

        int n = arr.length;

        // loop over each node
        // rearrange arr to construct a heap
        for (int i = 2; i<n; i++){ 

            System.out.println("----------------------");
            System.out.println("i = " + i + "start: ");
            printArr(arr);
            markSlidingWindow(arr, i);

            // we would need some additional variables in a loop
            int current_K= arr[i];         // mark down newly added node

            int current_child= i;               // i points to child
            int current_parent = i/2;            // P points to parent

            boolean heap = false;

            while(!heap && current_parent >=1  ){                     // check heap property up tills the root

                if (arr[current_child] < arr[current_parent]){        // if satisfy heap property
                    heap = true;
                }else{                                                // if child is bigger than parent
                    // firstly swap child and parent
                    swap(current_child, current_parent, arr);

                    // move points to check heap property upwards till the root
                    // TODO: 
                    if(current_parent >= 2){
                        current_parent = current_parent/2;
                        current_child = current_parent*2;
                    }else{
                        current_child = current_parent*2;
                    }
                }

                System.out.println("---");
                System.out.println("while loop: i = " + i);
                printArr(arr);
                markSlidingWindow_ParentChild(arr, current_parent);
            }

            System.out.println("---------");
            System.out.println("i = " + i + "end: ");
            printArr(arr);
            markSlidingWindow(arr, i);
        }

        return arr;
    }

    // helper functions ------------------------------------------------
    public static boolean checkHeapProperty(int parent, int[] arr){
        // TODO:
        if (arr[parent] >= arr[] )

        return false;
    }

    public static void swap(int i, int j, int[] arr){
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void printArr(int[] arr){
        // print array
        for (int ele:arr){
            System.out.print(ele + ", ");
        }

        System.out.println();
        // print index
        for (int i = 0; i<arr.length;i++){
            System.out.print(i+ "  ");
        }

        System.out.println();

    }

    public static void markSlidingWindow(int[] arr, int i){

        for (int mark = 0; mark < arr.length; mark++){
            if (mark==i/2){  // mark down parent 
                System.out.print("P  ");    // P stands for parent
            }else if(mark == i ){ // mark down child
                System.out.print("i  ");
            }else{
                System.out.print("   ");
            }
        }
        System.out.println();
    }

    public static void markSlidingWindow_ParentChild(int[] arr, int parent){

        for (int mark = 0; mark < arr.length; mark++){
            if (mark==parent){  // mark down parent 
                System.out.print("P  ");    // P stands for parent
            }else if(mark == parent*2 ){ // mark down child
                System.out.print("C  ");    // C stands for child
            }else{
                System.out.print("   ");
            }
        }
        System.out.println();
    }
}
