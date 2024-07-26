package behaviourPattern.observer.AtGuigu.observer_pattern;

/**
 *
 * @author xueshuo
 * @create 2023-05-01 9:05 pm
 */
public interface Subject {
    void registerObserver(Observer o);
    void removeObserver(Observer o);

    void notifyAllObserver();

}
