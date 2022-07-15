public class mathRandom_test {
    public static void main(String[] args)
    {
        System.out.println("test begins");
        int testTimes = 10000000;

        // test1---------------------------
        int count =0;
        for (int i=0; i<testTimes; i++){
            if (Math.random() < 0.75){
                count++;

            }
        }
        System.out.println((double) count / (double) testTimes); // should be close to 0.75

        System.out.println("========================="); 

        // test2----------------------------
        count = 0;
        for (int i=0; i <testTimes; i++){
            if(Math.random()*8 < 5){
                count++;
            }
        }
        System.out.println((double) count / (double) testTimes); // should be close to 0.625

        System.out.println("========================="); 

        // test3------------------------------
        int K=9;
        int[] counts = new int[K]; 
        for(int i =0; i<testTimes;i++){
            int ans = (int)(Math.random()*K); //Math.random()*9 returns [0,9), ans ranges from {0,1,2,3,4,5,6,7,8} as (int) is leftward
            counts[ans]++;  // histogram
        }
        for(int i =0; i<K; i++){
            System.out.println(i + "这个数， 出现了" + counts[i] + "次");
        }


        // test 4----------------------------------------
        System.out.println("========================="); 
        count = 0;
        double limit=0.7;
        for(int i =0; i<testTimes;i++){
            if (xToXPower2() < limit){
                count++;
            }
        }
        // print results should be close to 0.7^2=0.49
        System.out.println((double)count/(double)testTimes);
        System.out.println(Math.pow(limit,2)); 

        // test 5----------------------------------------
        System.out.println("========================="); 
        count = 0;
        double limit_2 = 0.7;
        for(int i =0; i<testTimes;i++){
            if (xToOneMinus() < limit_2){
                count++;
            }
        }
        // print results should be close to each other
        System.out.println((double)count/(double)testTimes);
        double pp = 1-(1-limit)*(1-limit);
        System.out.println(pp); 

    }

    // 返回[0,1)的一个小数
    // 任意的x, x属于[0,1), [0,x)范围上出现的概率由原来的x调整成x的平方
    // principle:  combination of probability density function 
    public static double xToXPower2(){
        return Math.max(Math.random(), Math.random());
    }
    
    // now 方法返回值落在[0,x)的概率由x调整为1-(1-x)^2
    public static double xToOneMinus(){
        return Math.min(Math.random(), Math.random());  
    }

}
