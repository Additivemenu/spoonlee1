// this file contains 3 classes:
// copyConstructor
// Person
// Date

package UniMelb.copyConstructor;

// ================================================================
public class copyConstructor {
    public static void main (String[] args) {
        Person me    =new Person("Xueshuo",new Date(1998/*yy*/,3/*mm*/,25/*dd*/), null);
        Person friend=new Person("Ming",new Date(1998/*yy*/,2/*mm*/,14/*dd*/), null);

        System.out.println(me.oldest(friend) + " is older");
    }
}

// =======================================================================================
class Person
{   
    // step1: fields--------------------------------------------------------------
    private String name;
    // watch below fields are of class type 
    private Date born;
    private Date died; //null if still alive

    // step2: constructor---------------------------------------------------------
    public Person(String initialName, Date birthDate, Date deathDate)
    {
        if (consistent(birthDate, deathDate))
        {
            name = initialName;
            born = new Date(birthDate);
            if (deathDate == null)
                died = null;
            else
                died = new Date(deathDate);
            }
        else
        {
            System.out.println("Inconsistent dates.");
            System.exit(1);
        }
    }

    public Person(Person original)
    {
        if (original == null)
        {
            System.out.println("Fatal error.");
            System.exit(1);
        }
        name = original.name;
        born = new Date(original.born);
        if (original.died == null)
            died = null;
        else
            died = new Date(original.died);
    }

    // step3: methods------------------------------------------------------------
    /**
    Class invariant: A Person always has a date of birth,
    and if the Person has a date of death, then the date of
    death is equal to or later than the date of birth.
    To be consistent, birthDate must not be null. If there
    is no date of death (deathDate == null), that is
    consistent with any birthDate. Otherwise, the birthDate
    must come before or be equal to the deathDate.
    */
    private static boolean consistent(Date birthDate, Date deathDate)
    {
        if (birthDate == null) return false;
        else if (deathDate == null) return true;
        else return (birthDate.precedes(deathDate) ||
                    birthDate.equals(deathDate));
    }

    public boolean equals(Person otherPerson)
    {
        if (otherPerson == null)
            return false;
        else
            return (name.equals(otherPerson.name) &&
                    born.equals(otherPerson.born) &&
                    datesMatch(died, otherPerson.died));
    }

    /**
    To match date1 and date2 must either be the
    same date or both be null.
    */
    private static boolean datesMatch(Date date1, Date date2)
    {
        if (date1 == null)
            return (date2 == null);
        else if (date2 == null) //&& date1 != null
            return false;
        else // both dates are not null.
            return(date1.equals(date2));
    }

    String oldest (Person p) { // return older person's name
        if (born.precedes(p.born))
            return name;
        else
            return p.name;
    }

    @Override
    public String toString( )
    {
        String diedString;
        if (died == null)
            diedString = ""; //Empty string
        else
            diedString = died.toString( );
        return (name + ", " + born + "-" + diedString);
    }

    public Date getBirthDate()
    {
        return new Date(born);
    }

    public Date getDeathDate()
    {
        return (died == null) ? null : new Date(died); // as class type field is involved, you have to consider deep copy to avoid privacy leak
    }

    public String getName()
    {
        return name;
    }
}

//==========================================================================================
class Date {
    // step1: fields------------------------------------
    int day, month, year;

    public Date(int yy, int mm, int dd) {
        day = dd;
        month = mm;
        year = yy;
    }
    // step2: constructor-----------------------------------------------------
    public Date(Date aDate) //constructor - chapter 4
    {
        if (aDate == null) //Not a real date.
        {
            System.out.println("Fatal Error.");
            System.exit(0);
        }
        month = aDate.month; // primitive data type of java, no need to consider deep copy
        day = aDate.day;
        year = aDate.year;
    }

    // step3: constructor-----------------------------------------------------
    public boolean equals (Date other) {
        return year == other.year
            && month == other.month
            && day == other.day;
    }

    /**
     * Return true if  this  is earlier than  other
     * Return false otherwise
     */
    public boolean precedes (Date other) {
        if (this.year < other.year){
            return true;
        }
        else if(this.year == other.year && this.month<other.month){
            return true;
        }
        else if(this.year == other.year && this.month==other.month && this.day<other.day){
            return true;
        }else{
            return false;
        }
    }
}

