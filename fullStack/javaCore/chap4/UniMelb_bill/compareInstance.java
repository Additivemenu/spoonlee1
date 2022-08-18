package UniMelb_bill;

public class compareInstance {

    public class Date {
        public int day;
        public int month;
        public int year;
    
        public void setDate(int day, int month, int year) {
            this.day = day; 
            this.month = month;
            this.year = year;
        }
        
        // comparison of instances
        public boolean equals(Date anotherDate) { //equals expects an argument of the same type as itself
            return (day==anotherDate.day && month==anotherDate.month && year==anotherDate.year);
        }
        // main 
        public void main(String[] args) {
            Date date1 = new Date();
            date1.setDate(13, 8, 2021);
    
            Date date2 = new Date();
            date2.setDate(26, 8, 2021);
    
            Date date3 = new Date();
            date3.setDate(13, 8, 2021);
            
            System.out.println("date1 and date2 are equal: " + date1.equals(date2));
            System.out.println("date1 and date3 are equal: " + date1.equals(date3));
        }
    }
}
