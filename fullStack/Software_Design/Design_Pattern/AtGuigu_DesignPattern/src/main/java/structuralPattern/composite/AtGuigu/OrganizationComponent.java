package structuralPattern.composite.AtGuigu;

/**
 * @author xueshuo
 * @create 2023-04-29 8:38 pm
 */
public abstract class OrganizationComponent {
    private String name;
    private String des;



    public OrganizationComponent(String name, String des) {
        this.name = name;
        this.des = des;
    }

    protected  void add(OrganizationComponent organizationComponent){
        // 默认实现, 不强制让实现类实现这个方法
        throw new UnsupportedOperationException();
    }

    protected  void remove(OrganizationComponent organizationComponent){
        // 默认实现, 不强制让实现类实现这个方法 (leaf node 不需要实现这个方法)
        throw new UnsupportedOperationException();
    }


    public abstract void print();

    public String getName() {
        return name;
    }

    public String getDes() {
        return des;
    }
}
