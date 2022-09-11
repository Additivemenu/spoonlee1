package DND;

public abstract class Player 
{   
    // fields ------------------------------------------------------------------------
    private String name;
	private double hitPoints;
    private boolean flightAttack; // 飞行攻击

    private static final double DEFAULT_HITPOINTS = 10;

    // constructors ------------------------------------------------------------------
    // default constructor
    public Player(){
        name = "";
        hitPoints = 0;
        flightAttack = false;
    } 

    // normal constructor
    public Player(String name, double hitPoints, boolean flightAttack){
        this.name = name;

        //
        if(hitPoints >= 0)
            this.hitPoints = hitPoints;
        else 
            this.hitPoints = DEFAULT_HITPOINTS;

        this.flightAttack = flightAttack;
    }

    // Copy constructor FIXME: really?
    public Player(Player otherPlayer){
        if(otherPlayer == null){
            System.out.println("ERROR: player cannot be null!");
            System.exit(0);
        }

        this.name = otherPlayer.name;
        this.hitPoints = otherPlayer.hitPoints;
        this.flightAttack = otherPlayer.flightAttack;
    }

    // methods -----------------------------------------------------------------------
    // accessor-------------------------------
    public String getName(){
        return this.name;
    }

    // setter---------------------------------
    public void setName(String name){
        if (name.equals("")){
            System.out.println();
        }
        this.name = name;
    }

    public void setHitpoint(double hitPoints){
        if (hitPoints < 0){
            this.hitPoints = DEFAULT_HITPOINTS;
        } else {
            this.hitPoints = hitPoints;
        }
    }

    // other auxiliary methods -----------------
    // abstract method: force children class to implement attack method
    public abstract double attack(Player otherPlayerObject);

    // toString 
    // this method effectively overridden the toString() method from class Object
    // derived class Warrior will overridden this method
    public String toString(){
        return this.name+": HP is" + this.hitPoints + " (flightAttack:"+ this.flightAttack+")";
    }

    // equals 
    public boolean equals(Player otherPlayer){
        if(otherPlayer == null){
            return false;
        }
        return(otherPlayer != null && name.equals(otherPlayer.getName())&& hitPoints == otherPlayer.hitPoints && flightAttack == otherPlayer.flightAttack );

    }
}