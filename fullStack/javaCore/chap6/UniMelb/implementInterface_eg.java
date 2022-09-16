package UniMelb;

public class OrderedHourlyEmployee extends HourlyEmployee implements Ordered  {
    // if this and other are comparable, then
    // return true if this.getpay() < other.get()--------------------------------
    public boolean precedes (Object other) {
        if (other == null)
            return false;
        else if (!(other instanceof OrderedHourlyEmployee))
            return false;
        else {

            OrderedHourlyEmployee otherOrderedHourlyEmployee
                                = (OrderedHourlyEmployee)other;

            return (getPay() < otherOrderedHourlyEmployee.getPay());
        }
    }
    // -------------------------------------------
    public boolean follows (Object other) {
        if (other == null)
            return false;
        else if (!(other instanceof OrderedHourlyEmployee))
            return false;
        else {

            OrderedHourlyEmployee otherOrderedHourlyEmployee
                                = (OrderedHourlyEmployee)other;
                                
            return otherOrderedHourlyEmployee.precedes(this);
        }
    }

    // ------------------------------------------
    public static void main(String[] args) {
        // Fill me in
    }
}

// interface ---------------------------------------------------
interface Ordered {
    public boolean precedes (Object other);     // don't forget the semicolon

    /**
     For objects o1 and o2 of the class, we should have
     o1.follows(o2) == o2.precedes(o1)
    */
    public boolean follows (Object other);
}

// base class ---------------------------------------------------
class HourlyEmployee {

    public double getPay () {
        return 0;
    }

}