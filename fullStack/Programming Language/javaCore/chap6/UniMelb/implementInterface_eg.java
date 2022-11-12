// content relating to upper bounding, downward bounding refer to chapter 5 inheritance

// the derived class that extend the based class and implements the interface==============================
class OrderedHourlyEmployee extends HourlyEmployee implements Ordered  {
    
    // fields -------------------------------------

    // constructors -------------------------------

    OrderedHourlyEmployee(double pay){
        super(pay);
    }

    // methods -------------------------------------
    // if this and other are comparable, then
    // return true if this.getpay() < other.get()
    // e.g. this.precedes(other) = true, if this.getpay() < other.getpay()
    // means in a sorted order (Asc), this.getpay() is in front of other.getpay()
    public boolean precedes (Object other) {          // watch here we just specify input is a object class (the base class of all classes), not its base class HourlyEmployee
        if (other == null)
            return false;
        else if (!(other instanceof OrderedHourlyEmployee))
            return false;
        else {                                        // if other is an instance of OrderedHourlyEmployee

            // down casting as we want to access a specific behavior of a subclass
            // if you don't do this, other will not be able to invoke getpay()
            OrderedHourlyEmployee otherOrderedHourlyEmployee = (OrderedHourlyEmployee)other;

            return (getPay() < otherOrderedHourlyEmployee.getPay()); 
           
        }
    }
    // -------------------------------------------
    // e.g. this.follow(other) = other.precedes(this), which is: return true if other.getpay() < this.getpay()
    // means in a sorted order (Asc), this.getpay() follows other.getpay()
    public boolean follows (Object other) {
        if (other == null)
            return false;
        else if (!(other instanceof OrderedHourlyEmployee))
            return false;
        else {

            OrderedHourlyEmployee otherOrderedHourlyEmployee = (OrderedHourlyEmployee)other;
                                
            return otherOrderedHourlyEmployee.precedes(this);   // make sure this.follow(other) = other.precedes(this)
        }
    }

    // ------------------------------------------
    public static void main(String[] args) {
        OrderedHourlyEmployee peter = new OrderedHourlyEmployee(100);
        OrderedHourlyEmployee josh = new OrderedHourlyEmployee(50);
        OrderedHourlyEmployee sarah = new OrderedHourlyEmployee(120);

        boolean p_pre_j = peter.precedes(josh);
        boolean p_fol_j = peter.follows(josh);

        System.out.println("The sorted order in Ascending order is: " + "josh < peter < sarah");
        System.out.println("Peter precedes josh in Ascending order ? -"+ p_pre_j );
        System.out.println("Peter follows josh in Ascending order ? -"+ p_fol_j );
    }
}

// interface ===================================================================
// the class who implements this interface must implement all the following methods
interface Ordered {
    public boolean precedes (Object other);     // don't forget the semicolon

    /**
     For objects o1 and o2 of the class, we should have
     o1.follows(o2) == o2.precedes(o1)
    */
    public boolean follows (Object other);
}

// base class ===================================================================
class HourlyEmployee {

    private double pay;

    HourlyEmployee(double pay){
        this.pay = pay;
    }

    public double getPay () {
        return pay;
    }

}