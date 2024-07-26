// derived class ===================================================
class MyConcreteClass extends MyAbstractClass {
    public boolean follows (Object other) {
        return true;        // Write the correct function here
    }

    public static void main(String[] args) {
        
    }
}

// abstract base class =============================================
abstract class MyAbstractClass implements Ordered {
    int number;
    char grade;

    public boolean precedes (Object other) {
        if (other == null)
            return false;
        else if (!(other instanceof MyAbstractClass))
            return false;
        else {
            MyAbstractClass otherMyAbstractClass
                                = (MyAbstractClass)other;
            return (number < otherMyAbstractClass.number);
        }
    }

    public abstract boolean follows (Object other);
}

// interface ================================================================ 
interface Ordered {
    public boolean precedes (Object other);
    public boolean follows (Object other);
}