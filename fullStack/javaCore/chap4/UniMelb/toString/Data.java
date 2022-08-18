package UniMelb.toString;

class Date {
    public int day;
    public int month;
    public int year;

    public void setDate(int day, int month, int year) {
        this.day = day; 
        this.month = month;
        this.year = year;
    }
    
    public String toString() { //the toString() method does not take parameters and returns a String that describes the current object
        return (day + "/" + month + "/" + year);
    }

    public static void main(String[] args) {
        Date date1 = new Date();
        date1.setDate(13, 8, 2021);
        System.out.println("date1: " + date1.toString());
    }
}
