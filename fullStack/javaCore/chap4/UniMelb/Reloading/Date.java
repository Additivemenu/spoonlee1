package UniMelb.Reloading;

// this code is from UniMelb Java

public class Date {
    private int day;
    private int month;
    private int year;

    // accessor methods
    public int getDay() {
        return day;
    }

    public int getMonth() {
        return month;
    }

    public int getYear() {
        return year;
    }

    public void setDate(Date date) {
        day = date.day;
        month = date.month;
        year = date.year; //notice how no condition test is applied as we rely on the precondition that the date parameter is already valid
    }

    // method takes 3 parameters
    public void setDate(int day, int month, int year) {
        setDay(day);
        setMonth(month);
        setYear(year);
    }

    // mutator methods with test of incoming data
    public void setDay(int day) {
        if((day <= 0) || (day > 31)) {
            System.out.println("Fatal Error");
            System.exit(0);
        } else {
            this.day = day;
        }
    }

    public void setMonth(int monthNumber) {
        if((monthNumber <= 0) || (monthNumber > 12)) {
            System.out.println("Fatal Error");
            System.exit(0);
        } else {
            month = monthNumber;
        }
    }

    public void setYear(int year) {
        if((year < 1000) || (year > 9999)) {
            System.out.println("Fatal Error");
            System.exit(0);
        } else {
            this.year = year;
        }
    }
    
    public boolean equals(Date otherDate) {
        if((otherDate.day == day)
            && (otherDate.month == month)
            && (otherDate.year == year)) {
                return true;
            } else {
                return false;
            }
    }

    public static void main(String[] args) {
        Date date1 = new Date();
        date1.setDay(1);
        date1.setMonth(2);
        date1.setYear(2021);

        Date date2 = new Date();
        date2.setDate(date1);

        System.out.println(date1.equals(date2));
    }
}
