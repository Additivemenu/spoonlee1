package behaviourPattern.state.demo3_document.states;

import behaviourPattern.state.demo3_document.Document;

/**
 * @author xueshuo
 * @create 2025-05-17 10:21
 */
public interface DocumentState {
    void handleRequest(Document document);
    String getStateName();
}
