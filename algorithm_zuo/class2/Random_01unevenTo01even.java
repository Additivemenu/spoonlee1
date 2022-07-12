public class Random_01unevenTo01even {
    public static void main(String[] args)
    {
        int count = 0;
        int testTimes = 100000;
        for(int i=0; i <testTimes; i++){
            if (f2()==1)
                count++;
        }
        System.out.println((double)count / (double)testTimes);

    }

    public static int f1(){
        return Math.random() < 0.84? 0:1;
    }

    public static int f2(){
        int ans = 0;
        do{
            ans=f1();
        }while(ans == f1()); // do loop again if while condition is satisfied
        // only if ans = 0 1 or ans = 1 0 give return, and return 0 or 1 with even possibility
        return ans;
    }
}
