//---------------------------------------------------------------------------------------------------------------------------
// this is for UniMelb java week4 lab practice
// along with txt read(input redirection) and export(output redirection)
// we will also use test_input.txt as the input file:  java histo_temp < test_input.txt
// use my_output.txt as the output file: java histo_temp < test_input.txt > my_outpu.txt
//----------------------------------------------------------------------------------------------------------------------------
// when you get the output, you can use diff command to check the differences between your output and expected output:
// diff my_output.txt test_output.txt
// sdiff my_output.txt test_output.txt


import java.util.*;
import java.util.Arrays;

public class histo_temp {
    public static void main(String[] args)
    {
        Scanner keyBoard = new Scanner(System.in);

        String[] weekDay = {"Mon", "Tue", "Wed", "Thu", "Fri"};
        //int[] temp = {0,0,0,0,0};
        int[] temp = new int[5];
        
        // read input---------------------------------------------------------
        for(int i=0; i<weekDay.length; i++){
            System.out.print("Please enter temperature for "+ weekDay[i]+":");
            temp[i]=keyBoard.nextInt();
        }

        System.out.println();
        System.out.println("Histogram of temperatures:");
        System.out.println("--------------------------");

        // output--------------------------------------------------------------
        for(int i=0; i<weekDay.length; i++){
            System.out.print(weekDay[i]+" | ");
            while(temp[i]>0){
                System.out.print("*");
                temp[i]--;
            }
            System.out.println();
        }
    }
}
