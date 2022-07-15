import java.util.Arrays;

public class Code02_BSNearLeft {
  
    public static void main(String[] args)
    {
        int testTime = 500000;
		int maxSize = 10;
		int maxValue = 100;
		boolean succeed = true;

		for (int i = 0; i < testTime; i++) {

			int[] arr = generateRandomArray(maxSize, maxValue);

			Arrays.sort(arr);
            // the value we want to find
			int value = (int) ((maxValue + 1) * Math.random()) - (int) (maxValue * Math.random());

            // check results with 暴力遍历
			if (test(arr, value) != mostLeftNoLessNumIndex(arr, value)) {
                // if something wrong, print it
				printArray(arr);
				System.out.println(value);
				System.out.println(test(arr, value));
				System.out.println(mostLeftNoLessNumIndex(arr, value));
				succeed = false;
				break;
			}
		}        
		System.out.println(succeed ? "Nice!" : "Fucking fucked!"); 
    }


    // arr有序， 用二分法找>=num最左的index
    public static int mostLeftNoLessNumIndex(int arr[], int num){

        if(arr == null || arr.length == 0){
            return -1;
        }

        int L = 0;
        int R = arr.length-1;

        int index = -1; // 记录最左的index

        while(L <= R){
            int mid = (L+R)/2;
            if (arr[mid] >=num){  // num 在中点以左, 砍掉中点右半边
                index = mid; // 从右往左逼进, 因为要得到>=num最左
                R = mid -1;
            } else {    // num在中点以右, 砍掉中点左半边
                L = mid +1; // while ans remain unchanged
            }
        }
        return index;

    }

    // for test: 暴力遍历
    public static int test(int[] arr, int value) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] >= value) {
                return i;
            }
        }
        return -1;
    }

    // for test: 对数器
    public static int[] generateRandomArray(int maxSize, int maxValue) {
        int[] arr = new int[(int) ((maxSize + 1) * Math.random())];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) ((maxValue + 1) * Math.random()) - (int) (maxValue * Math.random());
        }
        return arr;
    }

    // for test
    public static void printArray(int[] arr) {
        if (arr == null) {
            return;
        }
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }    

}
