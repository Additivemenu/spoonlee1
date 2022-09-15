package wk8Tut;

/**
 * A class for representing an entity in a town.
 * Base class for every entity inside a town. (Resident, Building)
 */
public abstract class Entity {
    // fields ------------------------------------------


    // constructors -------------------------------------
    public Entity(){

    }

    // methods -------------------------------------------
	/**
	 * Return a description of this entity.
	 * @return a string describing this entity
     * An abstract method
	 */
	public abstract String describe();
	

	/**
	 * Return a description of interaction with this entity.
	 * @return a string describing the result of interacting with this entity
	 */
	public String interact() {
		return "(nothing happened)";
	}
}

