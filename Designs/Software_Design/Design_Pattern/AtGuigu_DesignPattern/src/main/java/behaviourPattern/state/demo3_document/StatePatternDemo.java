package behaviourPattern.state.demo3_document;

/**
 * @author xueshuo
 * @create 2025-05-17 10:20
 */
public class StatePatternDemo {
    public static void main(String[] args) {
        Document document = new Document("John Doe", "Important project proposal");

        System.out.println("Document created by: " + document.getAuthor());
        System.out.println("Initial state: " + document.getCurrentState());

        // Process the document through its lifecycle
        document.processDocument(); // Draft -> Review
        document.processDocument(); // Review -> Approved
        document.processDocument(); // Approved -> Published
        document.processDocument(); // Already Published (no change)

        System.out.println("Final state: " + document.getCurrentState());
    }
}
