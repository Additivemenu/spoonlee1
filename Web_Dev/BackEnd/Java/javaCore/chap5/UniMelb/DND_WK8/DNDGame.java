package javaCore.chap5.UniMelb.DND_WK8;

import java.util.Scanner;
import java.util.ArrayList;
import java.util.InputMismatchException;

//import java.util.IllegalArgumentException;

public class DNDGame
{

    private ArrayList<Player> humanPlayers;
    private ArrayList<Player> villains;

    public enum PLAYERTYPES {WARRIOR, WIZZARD, MONK};

    private Scanner keyboard;

    public DNDGame(Scanner keyboard) {
        humanPlayers = new ArrayList<Player>();
        villains = new ArrayList<Player>();
        this.keyboard = keyboard;

        welcome();
        int playerNumbers = promptPlayerNumbers();
        createPlayers(playerNumbers);
        
    }

    public void welcome() {
        System.out.println("Welcome to DND");
    }

    public int promptPlayerNumbers() {
        
        int userInput = -1;
        while(userInput < 0) {

            try {
                System.out.print("How many players would you like to create? > " );
                userInput = Integer.parseInt(keyboard.nextLine());
                if(userInput < 0)
                    throw new NumberFormatException();

            }
            catch(NumberFormatException e) {
                System.out.println("Sorry, only integers and numbers > 0 please!");
                userInput = -1;
            }
        }

        return userInput;
    }

    public void createPlayers(int playerNumber) {

        System.out.println("Which type of hero would you want to create?");
        
        
        String playerType = keyboard.nextLine();

        try {
        
            Player myPlayer;
            switch(PLAYERTYPES.valueOf(playerType.toUpperCase())) {
                case WARRIOR:
                    myPlayer = new Warrior();
                // case PLAYERTYPES.WIZZARD:
                //     myPlayer = new Wizzard();
                // default:
                //     myPlayer = new Warrior();
            }
        }
        catch (IllegalArgumentException e) {
            //TODO: deal with this here or set up another loop to make sure the user eventually types in a valid player class
        }



    }

    public static void main (String[] args)
	{

        Scanner keyboard = new Scanner(System.in);
        DNDGame game = new DNDGame(keyboard);

        //TODO: main game loop
        Object player1 = new Warrior("Legartha", 100, 50, 0);
        Player player2 = new Warrior("Ragnar", 150, 20, 10);

        System.out.println(player1);
        System.out.println(player2);
    }

    // public static void battle(ArrayList<Player> characters, ArrayList<Player> villains)
	// {
    //     //TODO: battle loop
    // }
}