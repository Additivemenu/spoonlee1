package UML.association.circular_dependency_test1;

/**
 * @author xueshuo
 * @create 2023-04-03 5:44 pm
 */
public class Invoice {
    private Order order;

    public Invoice(Order order) {
        this.order = order;
        order.createInvoice();
    }

    public Order getOrder() {
        return order;
    }
}
