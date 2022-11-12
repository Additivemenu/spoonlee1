package wk8Tut;

/**
 * A class representing a building in the town.
 * @author TODO: Write your name here
 */
public class Building extends Entity {
	
	// fields -----------------------------------------
    private final String color;
    private final int height; 


    // constructors ----------------------------------
    public Building(String color, int height){
        super();
        this.color = color;
        this.height = height;
    }


    // methods ---------------------------------------
	@Override
	public String describe() {
		// TODO: Implement this method.
		return color + " building with " + height + "floor(s)";
	}

}
