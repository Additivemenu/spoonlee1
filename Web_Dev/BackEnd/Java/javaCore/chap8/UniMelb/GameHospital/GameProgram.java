/**
 * A driver program for demonstrating that the Generic Hospital class works
 * for healing Players and Monsters.
 * 
 * @author TODO: Write your name here.
 *
 */
public class DriverProgram {

	public static void main(String[] args) {
		
		// TODO: Comment in the following code, or write your own
		// driver program code.
		
		// Hospital for Players.
		// FIXME: why???
		Hospital<Player> playerHospital = new Hospital<Player>();
		playerHospital.addPatient(new Player("Bilbo", 3, 20));
		playerHospital.addPatient(new Player("Frodo", 5, 23));
		

		playerHospital.displayStatus();
		System.out.println();
		playerHospital.healPatients();
		System.out.println();
		playerHospital.displayStatus();
		System.out.println();
		
		// Hospital for Monsters.
		Hospital<Monster> monsterHospital = new Hospital<Monster>();
		monsterHospital.addPatient(new Monster("Slime", 0, 5));
		monsterHospital.addPatient(new Monster("Slime", 0, 5));
		monsterHospital.addPatient(new Monster("Slime", 0, 5));
		monsterHospital.addPatient(new Monster("Slime", 0, 5));
		monsterHospital.addPatient(new Monster("Orc", 0, 15));
		
		monsterHospital.displayStatus();
		System.out.println();
		monsterHospital.healPatients();
		System.out.println();
		monsterHospital.displayStatus();
		System.out.println();
		

	}

}
