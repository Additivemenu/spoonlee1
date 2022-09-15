package wk8Tut;

/**
 * A town simulator program.
 * @author TODO: Write your name here
 */

public class TownSimulator {

	public static void main(String[] args) {

		// TODO: A sample driver program has been provided below (currently commented out).
		// You can uncomment it and use it as is or delete it and write your own.
		// Feel free to experiment with adding lots of different entities to your town here!
		
		
		// Create a Town.
		Town town = new Town("Forest");
		
		// Create and add some entities to the town.wk
		town.add(new Person("Penelope"));
		town.add(new Dog("K.K."));
		town.add(new Cat("Rosie"));

		town.add(new Building("blue", 2));
		town.add(new Building("red", 1));
		
		// Display the description of the town.
		town.displayDescription();
		
		// Interact with all entities in the town.
		town.displayInteraction();
		
		
	}

}
