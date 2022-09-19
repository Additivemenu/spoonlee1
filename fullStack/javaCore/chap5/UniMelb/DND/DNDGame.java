package DND;

// week 7 lec live code demo

public class DNDGame
{
    public static void main (String[] args)
	{
        //TODO: main game loop
        Player player1 = new Warrior("Legartha", 100, false, 50, 5);
        Player player2 = new Warrior("Ragnar", 150, false,20, 10);

        // as we defined toString method in class Player and its derived class Warrior
        System.out.println(player1);
        System.out.println(player2);
    }

    // public static void battle(ArrayList<Player> characters, ArrayList<Player> villains)
	// {
    //     //TODO: battle loop
    // }
}
