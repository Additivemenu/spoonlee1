package behaviourPattern.state.demo3_document.states;

import behaviourPattern.state.demo3_document.Document;

/**
 * @author xueshuo
 * @create 2025-05-17 10:22
 */
public class ApprovedState implements DocumentState {
    @Override
    public void handleRequest(Document document) {
        System.out.println("Document published");
        document.setState(new PublishedState());
    }

    @Override
    public String getStateName() {
        return "Approved";
    }
}
