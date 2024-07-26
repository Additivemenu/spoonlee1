package structuralPattern.flyweight;

/**
 * @author xueshuo
 * @create 2023-11-14 9:03 pm
 */
public class ConcreteWebSite extends WebSite{
    // 共享的部分, 属于是内部状态
    private String type = "";       // 网站的发布类型


    public ConcreteWebSite(String type) {
        this.type = type;
    }

    @Override
    public void use(User user) {        // ! user 是 外部状态
        System.out.println("网站的发布形式为:" + type + ", user is " + user.getUserName());
    }
}
