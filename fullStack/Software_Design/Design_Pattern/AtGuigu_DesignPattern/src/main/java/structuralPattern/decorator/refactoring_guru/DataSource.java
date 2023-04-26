package structuralPattern.decorator.refactoring_guru;

/**
 * A common data interface, which defines read and write operations
 *
 * @author xueshuo
 * @create 2023-04-26 2:11 pm
 */
public interface DataSource {
    void writeData(String data);

    String readData();
}
