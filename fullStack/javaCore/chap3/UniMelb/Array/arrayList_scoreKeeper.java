package UniMelb.Array;

// Fill in the blanks here to use an ArrayList of doubles to calculate basic statistics of some sports scores.
// (Cricket scores can have two numbers:<runs>for<wickets>.If you are super keen,you can use an ArrayList<ArrayList<double>>to keep track of both.I'mnot that keen,so the solution doesn'tdo this.)

public class arrayList_scoreKeeper {
    /**
     Shows difference between each of a list of cricket scores and their average.
    */
    public static void main (String[] args) {
        // Create an ArrayList of type Double called  score  here.
        // (Why Double and not double?)

        System.out.println("This program reads cricket scores an shows");
        System.out.println("how much each differs from the average.");

        System.out.println("Enter cricket scores:");
        // Parameters of type ArrayList<Double> are
        // handled just like any other class parameter.
        fillArrayList(score);
        showDifference(score);
    }

    /**
     Reads values into the array a.
    */
    public static void fillArrayList(/* What goes here? */ a) {
        System.out.println("Enter a list of nonnegative numbers.");
        System.out.println("Mark the end of the list with a negative number.");
        Scanner keyboard = new Scanner (System.in);
        double score;
        int index = 0;
        score = keyboard.nextDouble();
        while (score >= 0) {
            // What goes here?
        }
    }

    /**
     Returns the average of numbers in a.
    */
    public static double computeAverage (/* What goes here? */ a) {
        double total = 0;
        // Write code to make total equal
        // the sum of the elements in a
        
        int numberOfScores = // What goes here?
        if (numberOfScores > 0) {
            return (total / numberOfScores);
        } else {
            System.err.println("ERROR: Trying to average no numbers.");
            System.err.println("computerAverage is returning 0.");
            return 0;
        }
    }

    /**
     Gives screen output showing how much each of
     the elements in  a  differ from their average
    */
    public static void showDifference (/* What goes here? */ a) {
        double average = computeAverage(a);
        System.out.println("Average of the " + a.size ()
                            + " scores = " + average);
        System.out.println("The scores are:");
        
        // put a suitable loop here
            System.out.println(element + " differs from the average by "
                                        + (element - average));
    }
}
