package UML.association.circular_dependency_test1;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-04-03 5:43 pm
 */
public class Customer {
    private List<Order> orders;

    public Customer() {
        orders = new ArrayList<>();
    }

    public void addOrder(Order order) {
        orders.add(order);
        order.setCustomer(this);
    }

    public List<Order> getOrders() {
        return orders;
    }

    public Invoice getInvoiceForOrder(Order order) {
        return order.getInvoice();
    }
}
