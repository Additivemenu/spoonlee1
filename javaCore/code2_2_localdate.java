import java.time.LocalDate;

public class code2_2_localdate
{
    public static void main(String[] args)
    {
        LocalDate newYearsEve = LocalDate.of(1993,12,12);
        int year = newYearsEve.getYear();
        int month = newYearsEve.getMonthValue();
        int day = newYearsEve.getDayOfMonth();

        System.out.println( "aa1" ); 
    }
}