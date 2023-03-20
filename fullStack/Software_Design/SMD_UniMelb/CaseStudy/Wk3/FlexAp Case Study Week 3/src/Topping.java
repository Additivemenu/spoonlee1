/*
 * Topping describes a topping that can be included in a PizzaStyleDescription, or added/removed from a specific Pizza
 */
public class Topping {
	private String name;
	private double costOfAddOn;
	
	public Topping(String _name, double _costOfAddOn) {
		name = _name;
		costOfAddOn = _costOfAddOn;
	}
	
	public double getCostOfAddOn() {
		return costOfAddOn;
	}
	
	public String getName() {
		return name;
	}

}
