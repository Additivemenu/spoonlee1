
/**
 * Thanks to inheritance, most of the standard Java library classes can be enhanced by defining a derived class with additional methods.

For example, the StringTokenizer class enables all the tokens in a string (for example, all of the runs of non-whitespace characters) to be generated one time.  However, sometimes it would be nice to be able to cycle through the tokens a second or third time.

This can be made possible by creating a derived class. For example, EnhancedStringTokenizer can inherit the useful behavior of StringTokenizer.  It inherits the countTokens method unchanged.

The new behavior can be modeled by adding new methods, and/or overriding existing methods.  In the following, a new method, tokensSoFar, is added, and an existing method, nextToken, is overriden.
 */

import java.util.StringTokenizer;

public class EnhancedStringTokenizer extends StringTokenizer {
    // fields -----------------------------------------------------------------
    private String[] a;
    private int count;

    // constructors -----------------------------------------------------------
    public EnhancedStringTokenizer(String theString) {
        super(theString);

        a = new String[countTokens()]; // inherited method
        count = 0;
    }

    public EnhancedStringTokenizer(String theString, String delimiters) {
        super(theString, delimiters);

        a = new String[countTokens()];
        count = 0;
    }

    // methods ----------------------------------------------------------------
    /**
     * Returns the same value as the same method in the StringTokenizer class,
     * but it also stores data for the method tokensSoFar to use.
     */
    @Override // not necessary, but helps reader
    public String nextToken() { // overridden method
        String token = super.nextToken();

        a[count] = token;
        count++;
        return token;
    }

    /**
     * Returns the same value as the same method in the StringTokenizer class,
     * changes the delimiter set in the same way as does the same method in the
     * StringTokenizer class, but it also stores data for the method tokensSoFar to
     * use.
     */
    public String nextToken(String delimiters) { // overridden method
        String token = super.nextToken(delimiters); // call function from super-class
        // a[count] = token; // These are done by nextToken(), by polymorphism
        // count++;
        return token;
    }

    /**
     * Returns an array of all tokens produced o far.
     * Array returned as length equal to the number of tokens produced so far.
     */
    public String[] tokensSoFar() {
        String[] arrayToReturn = new String[count];
        // Why could we not use for (int i : a) ?
        for (int i = 0; i < count; i++) {
            arrayToReturn[i] = a[i];
        }
        return arrayToReturn;
    }

    public static void main(String[] args) {

        EnhancedStringTokenizer token = new EnhancedStringTokenizer("aaa");

    }
}