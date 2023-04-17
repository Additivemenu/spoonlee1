package structuralPattern.decorator.chatGPT;

/**
 * @author xueshuo
 * @create 2023-04-17 10:44 pm
 */
public class PlainText implements Text {
    private String content;

    public PlainText(String content) {
        this.content = content;
    }

    @Override
    public String getContent() {
        return content;
    }
}

