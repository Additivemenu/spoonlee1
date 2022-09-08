import java.beans.Expression;

public class instanceof_Demo {
    public static void main(String[] args) {

        Person a = new Employed("John", "computer scientist");
        Person b = new Musician("Jane", "flute");
        Person c = new ExperiencedMusician("Shawn", "piano", 20);

        // derived class call the method in base class
        a.print(); // is Employed
        b.print(); // is Musician but not ExperiencedMusician
        c.print(); // is Musician and also ExperiencedMusician
    }
}

// base class ==============================================
class Person {
    // field-----------------------------
    String name;

    // constructors----------------------
    Person(String n) {
        name = n;
    }

    // methods --------------------------
    void print() { // package access ? derived class can also call this method
        System.out.println("------------------------------------");
        System.out.println(this instanceof Employed);
        System.out.println(this instanceof Musician);
        System.out.println(this instanceof ExperiencedMusician);

        System.out.print(name);

        // adaptive to different children
        if (this instanceof Employed) {
            // the cast (Employed) means
            // "treat this as type Employed, not just Person"
            // That allows us to use methods implemented by Employed,
            // but not by all objects of type Person.
            Employed e = (Employed) this;
            System.out.println(", job: " + e.getJob());

        }

         if (this instanceof Musician) {

            Musician m = (Musician) this; // you are going to use methods in Musician
            System.out.println(",1 instrument: " + m.getInstrument());

        }
        
        if (this instanceof ExperiencedMusician) {

            ExperiencedMusician m = (ExperiencedMusician) this; // you are going to use methods in ExperiencedMusician
            System.out.println(",2 instrument: " + m.getInstrument());

        }

        System.out.println("");
    }
}

// derived class1 =======================================================
class Employed extends Person {
    // fields ----------------------------
    String job;

    // constructors ----------------------
    Employed(String n, String j) {
        super(n);
        job = j;
    }

    // methods --------------------------
    String getJob() {
        return job;
    }
}

// derived class2========================================================
class Musician extends Person {
    // fields --------------------------------
    String instrument;

    // constructors -------------------------
    Musician(String n, String inst) {
        super(n);
        instrument = inst;
    }

    // methods ------------------------------
    String getInstrument() {
        return instrument;
    }
}

// derived class 21========================================================
class ExperiencedMusician extends Musician {
    // fields ------------------------------
    int yearsPlayed;

    // constructor -------------------------
    ExperiencedMusician(String n, String inst, int years) {
        super(n, inst);
        yearsPlayed = years;

    }

    // methods ---------------------------
    @Override
    String getInstrument() {
        String original = super.getInstrument(); // you cannot directly access super.instrument
        instrument = original + " for " + yearsPlayed + " years"; // this.instrument
        return instrument;
    }
}
