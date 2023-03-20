import java.util.ArrayList;

/*
 * Pizza objects represent an actual ordered Pizza, including any customisations made by the user. 
 * They are created with reference to a PizzaStyleDescription instance, which sets up the base toppings and pricing.
 */
public class Pizza {
	private PizzaSize size;
	private PizzaStyleDescription style;
	private ArrayList<Topping> addedToppings = new ArrayList<Topping>();
	private ArrayList<Topping> removedToppings = new ArrayList<Topping>();
	
	//Pizzas added to orders must be instantiated with a style and size
	public Pizza (PizzaStyleDescription _style, PizzaSize _size) {
		style = _style;
		size = _size;
	}
	
	public void addTopping(Topping toppingToAdd) {
		addedToppings.add(toppingToAdd);
	}
	
	public void removeTopping(Topping toppingToRemove) {
		removedToppings.add(toppingToRemove);
	}
	
	
	//returns all current toppings on the Pizza
	public ArrayList<Topping> getTotalToppings() {
		
		ArrayList<Topping> toppings = style.getToppings();
		for (Topping at : addedToppings) {
			toppings.add(at);
		}
		
		for (Topping rt : removedToppings) {
			toppings.remove(rt);
		}
		return toppings;
	}

	public double getPrice() {
		//get the price of the base Pizza for the chosen size
		double price = style.getPrice(size);
		//add the price of each additional topping
		for (Topping at : addedToppings) {
			price += at.getCostOfAddOn();
		}
		return price;
	}
	
	public void editSize(PizzaSize newSize) {
		size = newSize;
	}
	
	public PizzaStyleDescription getStyle() {
		return style;
	}
	
	public ArrayList<Topping> getAddedToppings(){
		return addedToppings;
	}
	
	public ArrayList<Topping> getRemovedToppings(){
		return removedToppings;
	}
	
	public PizzaSize getSize() {
		return size;
	}

}
