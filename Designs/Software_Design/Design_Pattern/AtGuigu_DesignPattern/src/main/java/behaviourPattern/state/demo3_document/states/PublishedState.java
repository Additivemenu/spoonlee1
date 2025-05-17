package behaviourPattern.state.demo3_document.states;

import behaviourPattern.state.demo3_document.Document;

/**
 * @author xueshuo
 * @create 2025-05-17 10:23
 */
public class PublishedState implements DocumentState {
    @Override
    public void handleRequest(Document document) {
        System.out.println("Document is already published. No further action needed.");
    }

    @Override
    public String getStateName() {
        return "Published";
    }
}
