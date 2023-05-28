package behaviourPattern.observer.refactoring_guru;

import behaviourPattern.observer.refactoring_guru.editor.Editor;
import behaviourPattern.observer.refactoring_guru.listener.EmailNotificationListener;
import behaviourPattern.observer.refactoring_guru.listener.LogOpenListener;

/**
 * @author xueshuo
 * @create 2023-05-07 6:55 pm
 */
public class Demo {
    public static void main(String[] args) {
        Editor editor = new Editor();
        editor.events.subscribe("open", new LogOpenListener("/log/file.txt"));
        editor.events.subscribe("save", new EmailNotificationListener("admin@example.com"));

        try {
            editor.openFile("test.txt");
            editor.saveFile();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
