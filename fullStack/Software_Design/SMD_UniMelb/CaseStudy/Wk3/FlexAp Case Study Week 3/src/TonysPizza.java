
/*
 * A driver program for adding a pizza to an order and customising the pizza
 */

public class TonysPizza {
	
	public static int orderCount = 1;

	public static void main(String[] args) {
		
		//Some reference data for toppings and pizzas
		Topping ham = new Topping("Ham", 1.50);
		Topping pineapple = new Topping("Pineapple", 1.25);
		Topping pepperoni = new Topping("Pepperoni", 2.20);
		Topping capsicum = new Topping("Capsicum", 1.25);
		PizzaStyleDescription hawaiian = new PizzaStyleDescription ("Hawaiian");
		hawaiian.addTopping(ham);
		hawaiian.addTopping(pineapple);
		hawaiian.addPricing(PizzaSize.SMALL, 10.00);
		hawaiian.addPricing(PizzaSize.MEDIUM, 15.00);
		hawaiian.addPricing(PizzaSize.LARGE, 18.00);
		hawaiian.addPricing(PizzaSize.FAMILY, 22.00);

	
		//create a new order
		Order currentOrder = new Order();
		OrderLineItem currentLineItem = currentOrder.addPizza(hawaiian, PizzaSize.SMALL);
		
		//make some adjustments
		currentLineItem.getItem().addTopping(pepperoni);
		currentLineItem.getItem().addTopping(capsicum);
		currentLineItem.getItem().removeTopping(ham);
		currentLineItem.getItem().editSize(PizzaSize.FAMILY);
		currentLineItem.editQuantity(3);
		
		//add a customer to the order
		Customer currentUser = new Customer("John Smith", "john.smith@email.com");
		currentOrder.addCustomer(currentUser);
		
		//print the order
		currentOrder.printOrder();
		

	}

}
