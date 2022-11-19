/**
 * A class representing a Monster.
 * @author Dengke Sha
 *
 */
public class Monster extends Unit {
	
	public Monster(String name, int currentHealth, int maxHealth) {
		super(name, currentHealth, maxHealth);
	}

	@Override
	public void displayStatus() {
		System.out.print("Monster - ");
		super.displayStatus();
	}

}