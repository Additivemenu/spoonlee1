package behaviourPattern.observer.refactoring_guru.listener;

/**
 * @author xueshuo
 * @create 2023-05-07 6:55 pm
 */
import java.io.File;

public class EmailNotificationListener implements EventListener {
    private String email;

    public EmailNotificationListener(String email) {
        this.email = email;
    }

    @Override
    public void update(String eventType, File file) {
        System.out.println("Email to " + email + ": Someone has performed " + eventType + " operation with the following file: " + file.getName());
    }
}
