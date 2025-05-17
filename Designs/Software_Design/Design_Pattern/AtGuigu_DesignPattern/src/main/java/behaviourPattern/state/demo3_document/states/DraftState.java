package behaviourPattern.state.demo3_document.states;

import behaviourPattern.state.demo3_document.Document;

/**
 * @author xueshuo
 * @create 2025-05-17 10:22
 */
public class DraftState implements DocumentState {
    @Override
    public void handleRequest(Document document) {
        System.out.println("Document submitted for review");
        document.setState(new ReviewState());
    }

    @Override
    public String getStateName() {
        return "Draft";
    }
}

