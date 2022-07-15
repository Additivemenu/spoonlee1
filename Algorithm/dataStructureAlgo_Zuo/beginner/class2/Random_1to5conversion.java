public class Random_1to5conversion {
    public static void main(String[] args)
    {
        int count = 0;
        int testTimes = 100000;
        for (int i= 0; i<testTimes; i++){
            if (f2()==0){
                count++;
            }
        }
        System.out.println((double)count/(double)testTimes); // should be 0.5

        //
        int[] counts = new int[8];
        for (int i= 0; i<testTimes; i++){
            int num = f4();
            counts[num]++;
        }
        for(int i =0; i<8; i++){
            System.out.println(i + "这个数， 出现了" + counts[i] + "次");
        }
    }
    
    // from lib, cannot change!
    public static int f1(){
        return (int)(Math.random()*5)+1; // return 1, 2, 3, 4, 5 with even possibility 
    }

    // convert f1 to a function that return 0 or 1 evenly 
    public static int f2(){
        int ans=0;
        do{
            ans = f1();
        }while(ans ==3);
        // ans =1,2, return 0, ans =4,5 return 1
        return ans<3?0:1;
    }

    //得到000 - 111 等概率返回, 也就是做到了0-7等概率返回
    public static int f3(){
        return (f2()<<2) + (f2()<<1) + (f2()<<0);
    }

    // 1~7等概率返回, 即排除掉f3中可能会得到的0
    public static int f4(){
        int ans=999;
        do{
            ans = f3();
        }while(ans==0);
        return ans;
    }
}
