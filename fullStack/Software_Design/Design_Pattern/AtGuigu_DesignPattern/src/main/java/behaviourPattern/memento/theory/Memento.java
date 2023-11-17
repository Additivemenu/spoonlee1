package behaviourPattern.memento.theory;

/**
 * @author xueshuo
 * @create 2023-11-17 12:47 pm
 */
public class Memento {
    private String state;

    public Memento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }
}
