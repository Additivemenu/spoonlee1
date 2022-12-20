/**
 * A class representing a Player.
 * @author Dengke Sha
 *
 */
public class Player extends Unit {

	public Player(String name, int currentHealth, int maxHealth) {
		super(name, currentHealth, maxHealth);
	}

	@Override
	public void displayStatus() {
		System.out.print("Player - ");
		super.displayStatus();
	}
	
}