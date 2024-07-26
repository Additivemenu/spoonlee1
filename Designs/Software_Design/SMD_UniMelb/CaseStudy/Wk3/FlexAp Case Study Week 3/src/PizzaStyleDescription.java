import java.util.ArrayList;
import java.util.HashMap;

/*
 * PizzaStyleDescription represents a type of pizza that may be ordered
 * They have toppings that they include by default, and a set of prices for each orderable size
 */
public class PizzaStyleDescription {
	private String name;
	private ArrayList <Topping> includedToppings = new ArrayList<Topping>();
	private HashMap <PizzaSize, Double> pricing = new HashMap<PizzaSize, Double>();

	
	public PizzaStyleDescription(String _name) {
		name = _name;
	}
	
	public void addTopping(Topping t) {
		includedToppings.add(t);
	}
	
	public void addPricing(PizzaSize size, double price) {
		pricing.put(size, price);
	}
	
	public ArrayList<Topping> getToppings(){
		return includedToppings;
	}

	//look up the price for a specified size
	public double getPrice(PizzaSize size) {
		double price = pricing.get(size);
		return price;
	}
	
	public String getName() {
		return name;
	}

}
