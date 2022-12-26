package javaCore.chap5.UniMelb.DND_WK8;

public abstract class Player 
{
    private String name;
	private double hitpoints;
    private boolean flightAttack;

    private static final double DEFAULT_HITPOINTS = 10;

    public Player() {
        hitpoints = DEFAULT_HITPOINTS;
        flightAttack = false;
    }

    public Player(String name, double hitpoints, boolean flightAttack) {
        this.name = name;
        
        // a player should never have -0 hitpoints unless dead
        if(hitpoints >=0)
            this.hitpoints = hitpoints;
        else
            this.hitpoints = DEFAULT_HITPOINTS;

        this.flightAttack = flightAttack;
    }

    public Player(Player otherPlayer) {
        if(otherPlayer==null) {
            System.out.println("ERROR: player cannot be null");
            System.exit(0);
        }

        this.name = otherPlayer.name;
        this.hitpoints = otherPlayer.hitpoints;
        this.flightAttack = otherPlayer.flightAttack;
    }

    //setter methods
    public void setName(String name) {
         if(name.equals("")) {
             System.out.println("WARNING: name should not be empty");
         }

         this.name = name;

    }

    public void setHitpoints(double hitpoints) {
         if(hitpoints < 0)
            this.hitpoints = DEFAULT_HITPOINTS;
        else 
            this.hitpoints = hitpoints;

    }

    public String getName() {
        return name;
    }

    //this method effectively overrides the toString() method from class Object
    public String toString() {
        return this.name + ": " + this.hitpoints + " (flightattack: " + this.flightAttack + ")";
    }

    public abstract double attack(Player otherPlayerObject);

    public boolean equals(Player otherPlayer) {
        
        return (otherPlayer!=null && name.equals(otherPlayer.name) && hitpoints==otherPlayer.hitpoints && flightAttack==otherPlayer.flightAttack);
    }
}