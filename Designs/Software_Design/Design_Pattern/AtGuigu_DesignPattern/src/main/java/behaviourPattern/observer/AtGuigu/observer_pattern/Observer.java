package behaviourPattern.observer.AtGuigu.observer_pattern;

/**
 * 观察者接口, 由观察者来实现
 *
 * @author xueshuo
 * @create 2023-05-01 9:06 pm
 */
public interface Observer {
    void update(float temperature, float pressure, float humidity);
}
