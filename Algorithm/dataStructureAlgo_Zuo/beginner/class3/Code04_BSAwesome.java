public class Code04_BSAwesome {
    public static void main(String[] args)
    {
        int testTimes = 10000;
        int maxLen = 5;
        int maxValue = 20;
        System.out.println("test begins!");

        for(int i=0;i<testTimes;i++){

            int[] arr = randomArray(maxLen, maxValue);

            int ans = oneMinIndex(arr); // binary search

            // 利用计数器check results
            if(!check(arr,ans)){ // if something wrong
                printArray(arr);
                System.out.println(ans);
                break;
            }        
        }   
        System.out.println("test is over!");
    }

    // arr 整体无序, 元素相邻不相等-------------------------------------------
    public static int oneMinIndex(int[] arr){
        // BCs:
        if(arr == null || arr.length ==0){
            return -1;
        }

        if(arr.length == 1)
            return 0;

        if(arr[0] < arr[1]){
            return 0;
        }

        int N =arr.length;
        if(arr[N-2]>arr[N-1]){
            return N-1;
        }

        // N > 2
        int L = 0;
        int R = N-1;
        int ans = -1;
        while(L<=R){
            int mid = (L+R)/2;

            if(arr[mid]< arr[mid-1] && arr[mid]<arr[mid+1]){
                ans = mid;
                break;
            }else{ // 不同时小于mid
                if(arr[mid-1] < arr[mid]){
                    R = mid-1;
                }else{
                    L = mid+1;
                }

            }
        }
        return ans;
    }

    // 生成随机数组, 且相邻元素不相等-------------------------------------------------------
    public static int[] randomArray(int maxLen, int maxValue){
        int len = (int)(Math.random()*maxLen);
        int[] arr = new int[len];

        if(len > 0){
            arr[0] = (int) (Math.random()*maxValue);

            for(int i=1; i < len; i++)
            {
                do{
                    arr[i] = (int)(Math.random()*maxValue);
                }while(arr[i] == arr[i-1]);
             
            }
        }
        return arr;

    } 
    
    //校验器: 校验二分法得到的局部最小值是否正确---------------------------------------------------
    public static boolean check(int[] arr, int minIndex){
        if(arr.length ==0){
            return  false;
        }
        
        int left = minIndex-1;
        int right = minIndex+1;
        boolean leftBigger = left >= 0? arr[left] > arr[minIndex]:true;  // left >= 0?   check if left is valid, if left is not valid, then that indicates minIndex is 0, and it is the local minimum
        boolean rightBigger = right < arr.length? arr[right] > arr[minIndex]:true;

        return leftBigger && rightBigger;
    }

    // print array------------------------------------------------------------------------------
    public static void printArray(int[] arr){
        for(int num: arr){
            System.out.print(num + "");
        }
        System.out.println();
    }
}
