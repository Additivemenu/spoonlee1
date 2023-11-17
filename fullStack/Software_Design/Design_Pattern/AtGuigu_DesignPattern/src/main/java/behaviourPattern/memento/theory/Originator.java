package behaviourPattern.memento.theory;

/**
 * @author xueshuo
 * @create 2023-11-17 12:45 pm
 */
public class Originator {
    private String state;       // state info

    // method that could keep state object Memento
    public Memento saveStateMemento(){
        return new Memento(state);
    }

    // use Memento instance to restore state
    public void getStateFromMemento(Memento memento){
        state = memento.getState();
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
