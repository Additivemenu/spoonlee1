/*
 * OrderLineItem is responsible for maintaining an item (currently only Pizzas) and its quantity within a particular order
 */
public class OrderLineItem {
	private Pizza item;
	private int quantity;
	
	public OrderLineItem(Pizza _item, int _quantity) {
		item = _item;
		quantity = _quantity;
	}
	
	public void editQuantity(int _quantity) {
		quantity = _quantity;
	}
	
	public double getTotal() {
		double itemPrice = item.getPrice();
		return (itemPrice * quantity);
	}
	
	public Pizza getItem() {
		return item;
	}
	
	public void printDetails() {
		//print quantity, size, style and base price of pizzas in the line item
		System.out.print(quantity + "x ");
		System.out.print(item.getSize().name() + " ");
		System.out.print(item.getStyle().getName());
		System.out.println(" ($" + String.format("%.2f", item.getStyle().getPrice(item.getSize())) + " each)");
		
		//print added toppings and their prices
		for (Topping t : item.getAddedToppings()) {
			System.out.println("ADD: " + t.getName() + " (+ $" + String.format("%.2f",t.getCostOfAddOn()) + " each)");
		}
		
		//print removed toppings
		for (Topping t : item.getRemovedToppings()) {
			System.out.println("REMOVE: " + t.getName());
		}
		
	}

}
