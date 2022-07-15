package chap4;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class code2_2_localdate
{
    public static void main(String[] args)
    {   
        // use factory method
        LocalDate nowTime = LocalDate.now();
        int nowYear = nowTime.getYear();
        int nowMonth = nowTime.getMonthValue();
        int nowDay = nowTime.getDayOfMonth();
        System.out.println("nowTime: "+ nowYear+","+nowMonth+","+nowDay ); 

        //put newly constructed object into object variable (referencing)
        LocalDate newYearsEve = LocalDate.of(1993,12,12); 

        int year = newYearsEve.getYear();
        int month = newYearsEve.getMonthValue();
        int day = newYearsEve.getDayOfMonth();

        System.out.println("newYearEve: "+ year+","+month+","+day ); 

        //manipulate date object: plusDays
        LocalDate aThousandDaysLater = newYearsEve.plusDays(1000);
        int newYear = aThousandDaysLater.getYear();
        int newMonth = aThousandDaysLater.getMonthValue();
        int newDay = aThousandDaysLater.getDayOfMonth();
        System.out.println("1000Dayslater: "+ newYear+","+newMonth+","+newDay ); 

        //=================2.3 更改器方法与访问器方法============================
        // look back at newYearEve, anything happened to it?
        System.out.println("-----2.3: mutator & accessor-------------");
        // accessor method
        System.out.println("newYearEve: "+ year+","+month+","+day ); // unchanged, because plusDays is an accessor method

        //mutator method
        GregorianCalendar someDay = new GregorianCalendar(1999,11,31); // odd feature of that class: month numbers go from 0 to 11
        someDay.add(Calendar.DAY_OF_MONTH, 1000);

        int someDayYear = someDay.get(Calendar.YEAR);
        int someDayMonth = someDay.get(Calendar.MONTH);
        int someDayDay = someDay.get(Calendar.DAY_OF_MONTH);
        System.out.println("someDay: "+ someDayYear+","+someDayMonth+","+someDayDay ); // someDay changed because GregorianCalendar.add is a mutator method

    }
}