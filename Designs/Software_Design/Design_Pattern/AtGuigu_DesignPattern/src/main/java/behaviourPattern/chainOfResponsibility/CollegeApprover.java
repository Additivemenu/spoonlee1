package behaviourPattern.chainOfResponsibility;

/**
 * @author xueshuo
 * @create 2024-01-13 16:56
 */
public class CollegeApprover extends Approver{

    public CollegeApprover(String name) {
        super(name);
    }

    @Override
    public void processRequest(PurchaseRequest purchaseRequest) {
        if(purchaseRequest.getPrice() > 5000 &&  purchaseRequest.getPrice() <= 10000){
            System.out.println("request id: " + purchaseRequest.getId() + "is handled by " + this.name);
        }else {
            nextApprover.processRequest(purchaseRequest);
        }
    }
}
