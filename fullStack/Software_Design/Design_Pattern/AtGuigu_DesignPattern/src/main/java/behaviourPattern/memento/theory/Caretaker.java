package behaviourPattern.memento.theory;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-11-17 12:50 pm
 */
public class Caretaker {
    private List<Memento> mementoList = new ArrayList<>();

    public void add(Memento memento) {
        mementoList.add(memento);
    }

    // 从list中get到第index个Memento intance
    public Memento get(int index){
        return mementoList.get(index);
    }
}
