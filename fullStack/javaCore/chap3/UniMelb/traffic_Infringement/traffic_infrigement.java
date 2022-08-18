// unfinished
// this is from UniMelb java week4 tut practice
// 这个练习没技术含量就不写了

package UniMelb.traffic_Infringement;
import java.util.*;

public class traffic_infrigement {
    public static void main(String[] args)
    {
        Scanner keyBoard = new Scanner(System.in);

        System.out.print("Please enter speed:");
        int speed = keyBoard.nextInt();

        System.out.print("Is the driver drunk? ('Y' for drunk, 'N' otherwise):");
        boolean drunk = keyBoard.nextBoolean();
        double fine = 0.0;
        
        // judge and print
        if (speed < 60){
            System.out.println("thanks for being lawful!");
        } else if (speed > 60 && speed <65){ // only warning
            System.out.print("warning");
            
            if(drunk == true){
                System.out.print("+ take a shower");
            }
        } else if (speed > 65 && speed < 70){ // fine
            fine = 5.0*(speed-60);
            if(drunk == true){
                fine = 7.0*(speed-60);
            }
        } else{ // fine
            fine = 10.0*(speed-60);
            if(drunk == true){
                fine = 12.0*(speed-60);
            }
        }
    }
}
