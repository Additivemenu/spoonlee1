package UniMelb.Array;
//===================================================================================================================
// Write a to-do list object that will read lines from standard input (ending when a blank line is entered).
// Enter these into an ArrayList, in the order they are typed.
// Then print them all out, in order.

// Extra challenge:
// After the user has entered the list, allow them to remove items.
// Place the output line within a while loop that continues while the ArrayList is not empty.
// After outputting the list, ask the user to enter an entry to remove.
// Remove it and continue the next iteration of the loop.
//====================================================================================================================

import java.util.Scanner;
import java.util.ArrayList;

public class arrayListPractice {
    public static void main (String[] args) {
        // declared an arraylist with initial capacity of 20, contains String element
        ArrayList<String> toDoList = new ArrayList<String>(20); 
        
        // display current arrayList
        showCurrentArrayList(toDoList);

        System.out.println("Size of current toDoList is: "+ toDoList.size());
        System.out.println("Enter list entries, ending with a blank line.");
        
        Boolean done = false;
        String item = null; // you'd better initialize a variable
        Scanner keyboard = new Scanner (System.in);

        // user input loop ---------------------------------------
        while (!done) {

            // start to input
            System.out.println("Input an entry, or blank to end");
            
            item = keyboard.next();
            toDoList.add(item);

            // display current arrayList status-------
            showCurrentArrayList(toDoList);
            
            if(toDoList.size() == 20 || item.equals("stop")){
                done = true;
            }
        } // end of while----------------------------------------

    }


    public static void showCurrentArrayList(ArrayList<String> arrList){

        System.out.println("The list contains:");
            for (String ele:arrList){
                System.out.print(ele+ ", ");
            }
            System.out.println();
            System.out.println("Size of current toDoList is: "+ arrList.size());
            System.out.println("------------------------");
    }
}
