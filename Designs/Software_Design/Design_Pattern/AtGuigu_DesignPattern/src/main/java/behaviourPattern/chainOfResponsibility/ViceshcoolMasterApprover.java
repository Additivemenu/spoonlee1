package behaviourPattern.chainOfResponsibility;

/**
 * @author xueshuo
 * @create 2024-01-13 16:57
 */
public class ViceshcoolMasterApprover extends Approver {

    public ViceshcoolMasterApprover(String name) {
        super(name);
    }

    @Override
    public void processRequest(PurchaseRequest purchaseRequest) {
        if(purchaseRequest.getPrice() > 10000 &&  purchaseRequest.getPrice() <= 30000){
            System.out.println("request id: " + purchaseRequest.getId() + "is handled by " + this.name);
        }else {
            nextApprover.processRequest(purchaseRequest);
        }
    }
}
