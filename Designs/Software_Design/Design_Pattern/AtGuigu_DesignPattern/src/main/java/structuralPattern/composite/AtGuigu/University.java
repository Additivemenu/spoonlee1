package structuralPattern.composite.AtGuigu;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-04-29 8:42 pm
 */

// University 就是Container, 可以管理College
public class University extends OrganizationComponent{

    // List里存的是college
    List<OrganizationComponent> organizationComponentLists = new ArrayList<>();

    public University(String name, String des) {
        super(name, des);

    }

    @Override
    protected void add(OrganizationComponent organizationComponent){
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
