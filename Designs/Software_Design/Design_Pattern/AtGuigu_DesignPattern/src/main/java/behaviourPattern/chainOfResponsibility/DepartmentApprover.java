package behaviourPattern.chainOfResponsibility;

/**
 * @author xueshuo
 * @create 2024-01-13 16:54
 */
public class DepartmentApprover extends Approver{
    public DepartmentApprover(String name) {
        super(name);
    }

    @Override
    public void processRequest(PurchaseRequest purchaseRequest) {
        if(purchaseRequest.getPrice() <= 5000){
            System.out.println("request id: " + purchaseRequest.getId() + "is handled by " + this.name);
        }else {
            System.out.println(this.name + "pass request to next");
            nextApprover.processRequest(purchaseRequest);
        }
    }
}
