package behaviourPattern.chainOfResponsibility;

/**
 * @author xueshuo
 * @create 2024-01-13 16:51
 */
public abstract class Approver {
    Approver nextApprover;
    String name;

    public Approver(String name) {
        this.name = name;
    }

    public void setNextApprover(Approver nextApprover) {
        this.nextApprover = nextApprover;
    }

    public abstract void processRequest(PurchaseRequest purchaseRequest);
}
