import java.util.ArrayList;

public class Order {
	private int orderNumber;
	private ArrayList<OrderLineItem> lineItems = new ArrayList<OrderLineItem>();
	private Customer customer;

	//creates an order and gives it the next order number
	public Order() {
		orderNumber = TonysPizza.orderCount;
		TonysPizza.orderCount++;
	}

	public int getOrderNumber() {
		return orderNumber;
	}
	
	//add an existing customer instance to an order
	public void addCustomer(Customer _customer){
		customer = _customer;
	}

	//add a pizza to an order. Returns the OrderLineItem for easily visibility to the calling class in case further edits are required
	public OrderLineItem addPizza(PizzaStyleDescription chosenStyle, PizzaSize size) {
		Pizza myPizza = new Pizza(chosenStyle, size);
		OrderLineItem currentLineItem = new OrderLineItem(myPizza, 1);
		lineItems.add(currentLineItem);
		return currentLineItem;
	}
	
	//returns the total of the whole order
	public double getTotal(){
		double total = 0;
		for (OrderLineItem oli : lineItems) {
			total += oli.getTotal();
		}
		return total;
	}
	
	//prints out all details of the order, line item by line item
	public void printOrder() {
		System.out.println("Order Number: " + orderNumber);
		if (customer != null) {
			System.out.println("Prepared for: " + customer.getName() + " [" + customer.getEmail() + "]");
		}
		
		for (OrderLineItem oli : lineItems) {
			oli.printDetails();
		}
		
		System.out.println("Order Total: $" + String.format("%.2f", getTotal()));
	}
	
}
