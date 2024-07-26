package structuralPattern.composite.AtGuigu;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-04-29 8:51 pm
 */

// Department 是leaf node
public class Department extends OrganizationComponent{

    public Department(String name, String des) {
        super(name, des);

    }

    @Override
    public String getName(){
        return super.getName();
    }

    @Override
    public String getDes(){
        return super.getDes();
    }


    @Override
    public void print() {
        System.out.println("-----------" + getName()+ "----------");
    }
}
