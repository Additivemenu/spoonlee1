/**
 * An abstract class for holding Unit related features.
 * @author Dengke Sha
 *
 */
public abstract class Unit {
	
	private String name;
	
	private int currentHealth;
	private int maxHealth;
	
	/**
	 * Create a new Unit with a name and some health stats.
	 * @param name           the name of the unit
	 * @param currentHealth  the current health of the unit
	 * @param maxHealth      the maximum health of the unit
	 */
	public Unit(String name, int currentHealth, int maxHealth) {
		super();
		this.name = name;
		this.currentHealth = currentHealth;
		this.maxHealth = maxHealth;
	}

	/**
	 * Heal this Unit to full health.
	 */
	public void fullHeal() {
		currentHealth = maxHealth;
		System.out.print(name + " was healed! ");
		displayStatus();
	}
	
	/**
	 * Display the status of this Unit to screen.
	 */
	public void displayStatus() {
		
		System.out.println(name + " " + currentHealth + "/" + maxHealth);
		
	}

}
