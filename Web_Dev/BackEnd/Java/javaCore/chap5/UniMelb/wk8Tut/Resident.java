package javaCore.chap5.UniMelb.wk8Tut;

// derived class: Cat, Dog, Person 

public abstract class Resident extends Entity{
    // fields -------------------------------------
    private String name;

    // constructors -------------------------------
    public Resident(String name){
        super();
        this.name = name;
    }

    // methods ------------------------------------

    public String getName(){
        return name;
    }
}
