package javaCore.chap3;

public class labelBreak {
    public static void main(String[] args)
    {
        int i=7;

        outerLoop:
        while(i<20) {	
            for(int j=1; j<i; j++) {
                
                System.out.print("*");
            
                if(i==10)
                    break outerLoop;

                System.out.print("\n"); 
                //i++;
            }
            i++;
            System.out.println("--------");
        }

        System.out.println("\nEnough looping!");
    }
}
