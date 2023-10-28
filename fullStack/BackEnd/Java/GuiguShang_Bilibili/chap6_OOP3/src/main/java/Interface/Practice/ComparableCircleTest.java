package Interface.Practice;

/**
 * @author xueshuo
 * @create 2023-01-29 11:24 am
 */
public class ComparableCircleTest {
    public static void main(String[] args) {

        ComparableCircle c1 = new ComparableCircle(3.4);
        ComparableCircle c2 = new ComparableCircle(3.6);
        int compareValue = c1.compareTo(c2);
        if(compareValue > 0){
            System.out.println("c1 is bigger");
        }else if(compareValue < 0){
            System.out.println("c2 is bigger");
        }else{
            System.out.println("c1 equals c2");
        }

        try {
            int compareValue1 = c1.compareTo(new String("AA"));
            System.out.println(compareValue1);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
