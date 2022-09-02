package UniMelb.Array;

import java.util.ArrayList;

public class arrayListMethod {
    public static void main (String[] args) {
        ArrayList<String> list = new ArrayList<String> (20);

        list.add("one");
        list.add("two");
        list.add(2, "three");
        list.add(0, "zero");

        list.set(3, "Three"); // overwrite 

        for (String item : list)   // yes, we can foreach loop over an ArrayList
            System.out.println(item);
            
        System.out.println(list.size());
    }   
}
