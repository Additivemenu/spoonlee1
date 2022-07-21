import java.util.Arrays;
import java.util.FormatterClosedException;
// Java数组: 只能包含同一类型的元素, 长度一旦声明之后无法改变; 动态扩容用arrayList
// Java声明数组: 元素类型[] 

public class arrayJava {
    public static void main(String[] args)
    {   
        // section 3.10.1: announcing an array=====================================================
        // approach1: use for loop to add elements---------------------------
        int[] arr = new int[10]; // initializing all elements to 0
        for(int element:arr)
            System.out.println(element); // all 0

        for(int i=0; i < arr.length; i++)
        {
            arr[i] = i;
            System.out.print(arr[i] +", ");
        }

        // quick print out array -----
        System.out.println();
        System.out.println(Arrays.toString(arr));

        //approach2: explicitly list elements in {} --------------------------
        int[] smallPrimes = {1,2,3,4,5,6};
        for(int element:smallPrimes)
            System.out.println(element);

        String[] authors = {"james", "tamer", "mike",};
        for(String element:authors)
            System.out.println(element);

        //approach3: anonymous array to quick initiate an array without creating new variables------------------
        smallPrimes = new int[]{17,19,23,29,31,37};
        for(int element:smallPrimes)
            System.out.println(element);
        //approach3 is identical to: 
        int[] ann = {17,19,23,29,31,37,52};
        smallPrimes = ann;
        for(int element:smallPrimes)
            System.out.println(element);

        //section 3.10.4: copy an array=================================================================
        System.out.println("=====copy an array=====");

        int[] luckyNums = smallPrimes; //将一个数组变量拷贝到另一个数组变量, 这时两个变量将引用同一个数组

        luckyNums[5] = 99; // now smallPrimes[5] is also 99

        System.out.println("copied array: "+luckyNums[5]);
        System.out.println("original array: "+smallPrimes[5]);
        
        // Arrays.copyOf------------------
        System.out.println("--------copyof---------");
        // 直接开辟新的空间来存放copiedLuckyNums, 与原来的数组没有瓜葛
        int[] copiedLuckyNums = Arrays.copyOf(luckyNums, 2*luckyNums.length); // second parameter is the length of new copied array

        System.out.println(Arrays.toString(copiedLuckyNums));
        
        copiedLuckyNums[5] = 100; // 不影响luckyNums[5]与smallPrimes[5]的值
        System.out.println(Arrays.toString(copiedLuckyNums)); // arr[5] = 100
        System.out.println(Arrays.toString(luckyNums)); // arr[5] = 99
        System.out.println(Arrays.toString(smallPrimes)); // arr[5] = 99



    }
}
