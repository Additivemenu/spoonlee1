package CollectionInterface.ListPractice;

import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-01-16 12:46 pm
 */
public class ListPractice {
    /**
     * 区分list.remove(int index), list.remove(Object obj)
     */
    @Test
    public void testListRemove() {
        List list = new ArrayList();
        list.add(1);
        list.add(2);
        list.add(3); updateList(list);
        System.out.println(list);   //
    }
    private static void updateList(List list) {
        //list.remove(2);           // remove element with index = 2

        list.remove(new Integer(2));        // remove object '2'
    }
}
