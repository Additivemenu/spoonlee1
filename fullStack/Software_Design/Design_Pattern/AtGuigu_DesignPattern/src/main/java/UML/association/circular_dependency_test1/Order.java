package UML.association.circular_dependency_test1;

/**
 * @author xueshuo
 * @create 2023-04-03 5:44 pm
 */
public class Order {
    private Customer customer;
    private Invoice invoice;

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void createInvoice() {
        this.invoice = new Invoice(this);
    }

    public Invoice getInvoice() {
        return invoice;
    }
}
