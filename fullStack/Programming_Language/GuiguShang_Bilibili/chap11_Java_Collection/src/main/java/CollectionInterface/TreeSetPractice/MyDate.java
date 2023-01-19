package CollectionInterface.TreeSetPractice;

/**
 * @author xueshuo
 * @create 2023-01-18 7:46 pm
 */
public class MyDate implements Comparable{

    private int year;
    private int month;
    private int day;

    public MyDate() {
    }

    public MyDate(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    @Override
    public String toString() {
        return "MyDate{" +
                "year=" + year +
                ", month=" + month +
                ", day=" + day +
                '}';
    }

    @Override
    public int compareTo(Object o) {

        if(o instanceof MyDate){
            MyDate other = (MyDate) o;

            // compare year
            int year_diff = this.getYear() - other.getYear();
            if(year_diff != 0){
                return year_diff;
            }
            // compare month
            int month_diff = this.getMonth() - other.getMonth();
            if(month_diff != 0){
                return month_diff;
            }
            // compare day
            return this.getDay() - other.getDay();

        }else{
            throw new RuntimeException("input type not matched!");
        }

    }
}
