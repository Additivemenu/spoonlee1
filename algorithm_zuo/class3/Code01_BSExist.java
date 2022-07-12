import java.util.Arrays;

public class Code01_BSExist {

	public static void main(String[] args) {
		int testTime = 500000;
		int maxSize = 10;
		int maxValue = 100;
		boolean succeed = true;

		for (int i = 0; i < testTime; i++) {

			int[] arr = generateRandomArray(maxSize, maxValue);

            // make sure arr is ordered
			Arrays.sort(arr);
            // the value we want to find
			int value = (int) ((maxValue + 1) * Math.random()) - (int) (maxValue * Math.random());

            // check results with 暴力遍历
			if (test(arr, value) != find(arr, value)) { 
				System.out.println("出错了！");
				succeed = false;
				break;
			}
		}
		System.out.println(succeed ? "Nice!" : "Fucking fucked!"); // return "Fucking fucked" if any errors pop 
    }
    
    //保证arr有序: 二分法找----------------------------------------------
    public static boolean find(int[] arr, int num){
        if(arr == null || arr.length ==0){
            return false;
        }

        int L=0;
        int R = arr.length-1;
        
        // arr[0...N-1]
        while(L <= R){
            int mid = (L+R)/2;

            if (arr[mid]==num){
                return true;
            }
            else if(arr[mid] < num){  // discard the left portion
                L = mid +1;
            }
            else{ // discard the right portion
                R = mid-1;
            }
        }

        return false;
        
    }

    // for test: 暴力遍历找-----------------------------------------
    public static boolean test(int[] sortedArr, int num) {
        for (int cur : sortedArr) { // for each loop
            if (cur == num) {
                return true;
            }
        }
        return false;
    }

    // for test: 对数器-------------------------------------
    public static int[] generateRandomArray(int maxSize, int maxValue) {
        int[] arr = new int[(int) ((maxSize + 1) * Math.random())];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) ((maxValue + 1) * Math.random()) - (int) (maxValue * Math.random());
        }
        return arr;
    }

}
