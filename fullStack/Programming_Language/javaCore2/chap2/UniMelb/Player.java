package javaCore2.chap2.UniMelb;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import java.io.FileInputStream;
import java.io.FileOutputStream;

import java.io.FileNotFoundException;
import java.io.IOException;

import java.io.Serializable;
import java.io.File;

public class Player implements Serializable {

    // fields -------------------------------------
	public static double DEFAULT_HITPOINTS = 100;
	public static String DEFAULT_NAME = "Anonymous";

	private String name;
	private double hitpoints;
	private boolean flightAttack;

    // constructors --------------------------------
	public Player() {
		name = DEFAULT_NAME;
		hitpoints = DEFAULT_HITPOINTS;
		flightAttack = false;
	}

	public Player(String name, double hitpoints, boolean flightAttack) 	{
		if(name.equals("")) 		{
			this.name = DEFAULT_NAME;
		} else
			this.name = name;

		if(hitpoints<=0) {
			System.out.println("WARNING: new character created with default hitpoints.");
			this.hitpoints = DEFAULT_HITPOINTS;
		} else
			this.hitpoints = hitpoints;

		this.flightAttack = flightAttack;

		// System.out.println("+new Player created: " + name + ", hitpoints: " + hitpoints + ", flightAttack: " + flightAttack);
	}

	public Player(Player otherPlayer) {
		if(otherPlayer==null) {
			System.out.println("ERROR: player cannot be null");
			System.exit(0);
		}

		name = otherPlayer.name;
		hitpoints = otherPlayer.hitpoints;
		flightAttack = otherPlayer.flightAttack;
	}

    // methods ---------------------------------------------
	// GETTERS
	public String getName()	{ return name; }
	public double getHitpoints() { return hitpoints; }
	public boolean getFlightAttack() { return flightAttack; }

	// SETTERS / MODIFIERS

	public void setName(String name) {
		if(name.equals(""))
			this.name = DEFAULT_NAME;
		else
			this.name = name;
	}

	public void setHitpoints(double hitpoints) {
		if(hitpoints<=0) {
			System.out.println("WARNING: new character created with default hitpoints.");
			this.hitpoints = DEFAULT_HITPOINTS;
		}
		this.hitpoints = hitpoints;
	}

	public void setFlightAttack(boolean flightAttack) {
		this.flightAttack = flightAttack;
	}

    // to print object
	public String toString() {
		return name + " with current hitpoints: " + hitpoints + ", can attack flying objects: " + flightAttack;
	}

	public boolean equals(Player otherPlayer) {
		if(otherPlayer == null) {
			System.out.println("ERROR: player cannot be null");
			System.exit(0);
		}
		// else
		return (name.equals(otherPlayer.name) && hitpoints==otherPlayer.hitpoints && flightAttack==otherPlayer.flightAttack);
	}

    // main function ==============================================
	public static void main(String[] args) 	{
        // 
		String filename = "player.dat";
		File fileObject = new File(filename);

		if(fileObject.exists()) {  // fileobject exist, then read it

			System.out.println(filename + " already exists. Loading player...");
            // step0: 声明inputStream object
			ObjectInputStream inputStream = null;

			try {
                // step1: opening
				inputStream = new ObjectInputStream(new FileInputStream(filename));
				// step2: read an object
                Player myPlayer = (Player) inputStream.readObject();
                
				System.out.println(myPlayer.toString());

			} catch (FileNotFoundException e) {
				System.out.println("Could not open file: " + filename);
			} catch(IOException e) {
				System.out.println("Could not read from file.");
			} catch(ClassNotFoundException e) {
				System.out.println("Class not found.");
			}	
		} else  {	// fileobject not exist, then write one
            // step0: 声明outputStream object
			ObjectOutputStream outputStream = null;		
			try {
                // step1: opening (normally put this inside a try block)
				outputStream = new ObjectOutputStream(new FileOutputStream(filename));
				
				Player myPlayer = new Player("Ragnar", 100, false);
				// step2: 正式write
                outputStream.writeObject(myPlayer);
                // step3: closing
				outputStream.close();

			} catch (FileNotFoundException e) {
				System.out.println("Could not open file: " + filename);
			} catch(IOException e) {
				System.out.println("Could not read from file.");
			}
		}
	}

}