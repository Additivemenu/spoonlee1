package structuralPattern.composite.AtGuigu;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-04-29 8:49 pm
 */
public class College extends OrganizationComponent{

    // List 中存的是department
    List<OrganizationComponent> organizationComponentLists = new ArrayList<>();

    public College(String name, String des) {
        super(name, des);

    }

    @Override
    protected void add(OrganizationComponent organizationComponent){
        // 实际业务中, college.add() 和university.add() 的逻辑可能不会完全相同
        organizationComponentLists.add(organizationComponent);
    }

    @Override
    protected void remove(OrganizationComponent organizationComponent){
        organizationComponentLists.remove(organizationComponent);
    }


    @Override
    public String getName(){
        return super.getName();
    }

    @Override
    public String getDes(){
        return super.getDes();
    }

    // 输出University里包含的学院
    @Override
    public void print() {
        System.out.println("-----------" + getName()+ "----------");
        // loop over list
        for (OrganizationComponent ele : organizationComponentLists){
            ele.print();
        }
    }
}
