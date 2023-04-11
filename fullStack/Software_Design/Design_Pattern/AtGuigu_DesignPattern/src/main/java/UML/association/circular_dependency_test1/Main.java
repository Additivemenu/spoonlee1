package UML.association.circular_dependency_test1;

/**
 * @author xueshuo
 * @create 2023-04-03 5:44 pm
 */
public class Main {
    public static void main(String[] args) {
        Customer customer = new Customer();
        Order order = new Order();

        customer.addOrder(order);
        Invoice invoice = new Invoice(order);

        Invoice retrievedInvoice = customer.getInvoiceForOrder(order);
    }
}
