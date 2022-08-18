package UniMelb.mutator_method;

public class demoDate {
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
    
    // mutator method with test of incoming data
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
            this.month = monthNumber;
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
    
    public boolean equals(demoDate otherDate) {
        if((otherDate.day == day) //within the definition of Date, you can directly access private instance variables of any object of type Date
            && (otherDate.month == month)
            && (otherDate.year == year)) {
                return true;
            } else {
                return false;
            }
    }
}
