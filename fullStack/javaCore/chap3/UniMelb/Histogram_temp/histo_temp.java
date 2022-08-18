package UniMelb.Histogram_temp;

import java.util.*;

public class histo_temp {
    public static void main(String[] args)
    {
        Scanner keyBoard = new Scanner(System.in);

        String[] weekDay = {"Mon", "Tue", "Wed", "Thu", "Fri"};
        int[] temp = {0,0,0,0,0};
        //int temp = new int[5];
        
        // read input
        for(int i=0; i<weekDay.length; i++){
            System.out.print("Please enter temperature for "+ weekDay[i]+":");
            temp[i]=keyBoard.nextInt();
            
            System.out.println();
        }

        // output 
        for(int i=0; i<weekDay.length; i++){
            System.out.println(temp[i]);
        }
    }
}
