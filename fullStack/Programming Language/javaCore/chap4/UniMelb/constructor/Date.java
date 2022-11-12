// this java file is from UniMelb Java

package UniMelb.constructor;

public class Date {
    private int day;
    private int month;
    private int year;

    // constructor---------------------------------------
    public Date(int day, int month, int year) {
        setDay(day);
        setMonth(month);
        setYear(year);
    }

    // copy constructor: A constructor that takes an object of the 
    // same class as a parameter to create a copy 
    public Date(Date date) {
        day = date.day;
        month = date.month;
        year = date.year;
    }

    // accessor methods----------------------------------------------------
    public int getDay() {
        return day;
    }

    public int getMonth() {
        return month;
    }

    public int getYear() {
        return year;
    }

    // mutator methods with test of incoming data-------------------------
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
        Date date1 = new Date(1, 2, 2021); // day, month, year
        Date date2 = new Date(date1);
        date2.setMonth(5);

        System.out.println(date1.equals(date2));
    }
}
