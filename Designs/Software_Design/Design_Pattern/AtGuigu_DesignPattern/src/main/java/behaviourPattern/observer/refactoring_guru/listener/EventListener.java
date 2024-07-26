package behaviourPattern.observer.refactoring_guru.listener;

/**
 * observer class
 *
 * @author xueshuo
 * @create 2023-05-07 6:54 pm
 */
import java.io.File;

public interface EventListener {
    void update(String eventType, File file);
}
