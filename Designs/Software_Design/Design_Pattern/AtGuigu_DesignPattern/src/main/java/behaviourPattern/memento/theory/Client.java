package behaviourPattern.memento.theory;

/**
 * 为了简单, 这里状态信息只是String, 但其实状态信息可以很复杂
 * @author xueshuo
 * @create 2023-11-17 12:53 pm
 */
public class Client {
    public static void main(String[] args) {
        Originator originator = new Originator();       // used to generate a Memento instance, represent player's current state
        Caretaker caretaker = new Caretaker();          // used to store Memento instances

        // generate Memento instance
        originator.setState("state 1: attack point 100");
        caretaker.add(originator.saveStateMemento());

        // fighting boss
        originator.setState("state 2: attack point 80");
        caretaker.add(originator.saveStateMemento());

        // killed boss
        originator.setState("state 3: attack point 50");
        caretaker.add(originator.saveStateMemento());

        // now we hope to rollback to state 1
        System.out.println("current state is: " + originator.getState());       // state 3: attack point 50
        originator.getStateFromMemento(caretaker.get(0));
        System.out.println("now state is: " + originator.getState());       // state 1
    }
}
