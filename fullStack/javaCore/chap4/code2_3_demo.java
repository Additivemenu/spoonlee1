
import java.time.*;

public class code2_3_demo {
    public static void main(String[] args)
    {
        LocalDate date = LocalDate.now();
        int month = date.getMonthValue();
        int today = date.getDayOfMonth();

        date = date.minusDays(today -1); // set to start of month
        DayOfWeek weekday = date.getDayOfWeek();
        int value = weekday.getValue(); // 1 = Monday, ..., 7 = sunday
        //println(value);

        System.out.println("Mon Tue Wed Thu Fri Sat Sun");
        //print gap at the start of this month
        for (int i =1; i<value; i++)
            System.out.print("  / ");

        // iteration: print dates
        while(date.getMonthValue() == month)
        {
            System.out.printf("%3d ", date.getDayOfMonth());

            if(date.getDayOfMonth() == today) // mark today
                System.out.print("*");
            else    
                System.out.print("");

            date = date.plusDays(1); // move on to the next date----------

            if(date.getDayOfWeek().getValue()==1) System.out.println(); // change line if date.day = 1
        }

        if(date.getDayOfWeek().getValue() != 1) System.out.println(); // change line
    }
}
