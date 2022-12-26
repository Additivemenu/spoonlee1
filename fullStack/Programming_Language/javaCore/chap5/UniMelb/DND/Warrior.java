package javaCore.chap5.UniMelb.DND;

public class Warrior extends Player{
    // fields ---------------------------------------------------------------------------------
    private double strength;
    private double weaponMultiplier;

    // constructors ---------------------------------------------------------------------------
    public Warrior (double strength, double weaponMultiplier){
        super();

        this.strength = strength;
        this.weaponMultiplier = weaponMultiplier;
    }

    public Warrior (String name, double hitPoints, boolean flightAttack, double strength, double weaponMultiplier){
        super(name, hitPoints, flightAttack);

        this.strength = strength;
        this.weaponMultiplier = weaponMultiplier;
    }

    // methods -------------------------------------------------------------------------------
    public double attack(Player othPlayer){
        //
        return 0;
    }

    // toString
    @Override
    public String toString(){
        // calls super.toString()
        return super.toString() + ", strength:" + this.strength + ", weaponMultiplier: " + this.weaponMultiplier + ")";
    }

}
