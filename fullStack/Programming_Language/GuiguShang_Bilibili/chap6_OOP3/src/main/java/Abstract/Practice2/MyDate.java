package Abstract.Practice2;

/**
 * MyDate类包含:
 * private成员变量year,month,day ; toDateString()方法返回日期对应的字符串:xxxx年xx月xx日
 * @author xueshuo
 * @create 2023-01-27 9:27 pm
 */
public class MyDate {
    private int year;
    private int month;
    private int day;

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

    public MyDate(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public String toDateString(){
        return year + " / " + month +" / " + day;
    }
}
