package UniMelb.Array;

import java.util.Scanner;
import java.util.ArrayList;

public class arrayListPractice {
    public static void main (String[] args) {
        // Declare your ArrayList here
        ArrayList<String> toDoList = new ArrayList<String>(20);
        System.out.println("Size of current toDoList is: "+ toDoList.size());

        System.out.println("Enter list entries, ending with a blank line.");
        
        Boolean done = false;
        String item = null;
        Scanner keyboard = new Scanner (System.in);

        // user input loop ---------------------------------------
        while (!done) {
            System.out.println("Input an entry, or blank to end");
            
            item = keyboard.next();
            toDoList.add(item);

            System.out.println("Size of current toDoList is: "+ toDoList.size());
            
            if(toDoList.size() == 20 || item.equals("close")){
                done = true;
            }
        }

        // print out to-do list--------------------------------
        System.out.println("The list contains:");
        for (String ele:toDoList){
            System.out.println(ele);
        }

        // int index = toDoList.size();

        // while(!index == 0){
        //     System.out.println(toDoList(index));
        //     index--;
        // }
    }
}
