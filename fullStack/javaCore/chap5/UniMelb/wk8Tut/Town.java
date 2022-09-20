package wk8Tut;
/**
 * A class representing a town. Entities can be added to the town for
 * this class to manage.
 * @author TODO: Write your name here
 *
 */
import java.util.ArrayList;


// Town "has" Entity
public class Town {
	
	// fields --------------------------------------------------
	private String name;
    private ArrayList<Entity> entities = new ArrayList<Entity>();
	
	// constructors ---------------------------------------------
	public Town(String name){
        this.name = name;
    }

    // methods --------------------------------------------------
	/**
	 * Adds an entity to the entities in this town.
	 * @param entity  the entity to add to the town
	 */
	public void add(Entity entity) {
		this.entities.add(entity);
		
	}

	/**
	 * Prints out a description of the town and entities.
	 */
	public void displayDescription() {

        System.out.println("The name of the town: " + this.name + ", the number of entities in this town: " + this.entities.size());
		
        for (Entity ele: entities){
            System.out.println("It has ... a" + ele.describe());
        }
		
	}
	
	/**
	 * Prints out the result of interacting with every object inside the town.
	 */
	public void displayInteraction() {

		for (Entity ele:entities){
			System.out.println("You tried interacting with the " + ele.describe() + "..." + ele.interact());
		}
	}
	
}
