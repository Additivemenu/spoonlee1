// this code is from UniMelb Java week5 

package UniMelb.staticVariable;

public class humanMain {
    public static void main (String[] args) {
        for (int i = 0; i < 10; i++) {
            Human newHuman = new Human ("Person " + i);
            System.out.println("Current population: "
                + Human.getPopulation());
        }
    }
}

class Human {
    private String name;
    private static int populationCount = 0;

    public Human(String aName) {
        name = aName;
        populationCount++;
    }

    public static int getPopulation() {
        return populationCount;
    }
}


