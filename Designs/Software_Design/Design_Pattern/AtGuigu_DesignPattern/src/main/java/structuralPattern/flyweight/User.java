package structuralPattern.flyweight;

/**
 * @author xueshuo
 * @create 2023-11-14 9:32 pm
 */
public class User {
    private String userName;

    public User(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
