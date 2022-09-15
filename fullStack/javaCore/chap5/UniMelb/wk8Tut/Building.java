package wk8Tut;

/**
 * A class representing a building in the town.
 * @author TODO: Write your name here
 */
public class Building extends Entity {
	
	// fields -----------------------------------------
    String color;
    int height; 


    // constructors ----------------------------------
    public Building(){
        this.color = "white";
        this.height = 50;
    }


    // methods ---------------------------------------

	@Override
	public String describe() {
		// TODO: Implement this method.
		return color + " building with" + height + "floor(s)";
	}

}
