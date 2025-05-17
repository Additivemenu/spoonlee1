package behaviourPattern.state.demo3_document;

import behaviourPattern.state.demo3_document.states.DocumentState;
import behaviourPattern.state.demo3_document.states.DraftState;

/**
 * the context class
 * @author xueshuo
 * @create 2025-05-17 10:20
 */
public class Document {
    private DocumentState state;
    private String content;
    private String author;

    public Document(String author, String content) {
        // Initial state is Draft
        this.state = new DraftState();
        this.author = author;
        this.content = content;
    }

    public void setState(DocumentState state) {
        this.state = state;
    }

    public void processDocument() {
        System.out.println("Current state: " + state.getStateName());
        state.handleRequest(this);
    }

    public String getContent() {
        return content;
    }

    public String getAuthor() {
        return author;
    }

    public String getCurrentState() {
        return state.getStateName();
    }
}
