package behaviourPattern.chainOfResponsibility;

/**
 * @author xueshuo
 * @create 2024-01-13 17:00
 */
public class Client {
    public static void main(String[] args) {
        // create a request
        PurchaseRequest purchaseRequest = new PurchaseRequest(1, 25000, 1);

        // create handlers
        DepartmentApprover departmentApprover = new DepartmentApprover("department approver");
        CollegeApprover collegeApprover = new CollegeApprover("college approver");
        ViceshcoolMasterApprover viceSchoolMaster = new ViceshcoolMasterApprover("Vice school master");
        SchoolMasterApprover schoolMaster = new SchoolMasterApprover("school master");

        // build the responsibility chain (circular chain here)
        departmentApprover.setNextApprover(collegeApprover);
        collegeApprover.setNextApprover(viceSchoolMaster);
        viceSchoolMaster.setNextApprover(schoolMaster);
        schoolMaster.setNextApprover(departmentApprover);

        // invoke
        departmentApprover.processRequest(purchaseRequest);

    }
}
