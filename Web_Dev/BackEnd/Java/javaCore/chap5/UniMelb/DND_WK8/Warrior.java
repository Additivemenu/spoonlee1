package javaCore.chap5.UniMelb.DND_WK8;

public class Warrior extends Player {

    private double strength;
    private double weaponMultiplier;

    public Warrior() {
        
    }

    public Warrior(double strength, double weaponMultiplier) {
        super();

        this.strength = strength;
        this.weaponMultiplier = weaponMultiplier;
    }

    public Warrior (String name, double hitpoints, double strength, double weaponMultiplier) {
        super(name, hitpoints, false);

        this.strength = strength;
        this.weaponMultiplier = weaponMultiplier;
    }
    
    public double attack(Player otherPlayer) {
        // tbd
        return 0.0;
    }

    public String toString() {
        return this.getName() + " strength: " + this.strength + ", weaponMultiplier: " + this.weaponMultiplier;
    }

}
