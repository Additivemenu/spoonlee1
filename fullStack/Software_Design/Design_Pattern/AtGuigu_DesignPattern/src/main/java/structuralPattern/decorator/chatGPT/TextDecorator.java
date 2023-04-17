package structuralPattern.decorator.chatGPT;

/**
 * @author xueshuo
 * @create 2023-04-17 10:45 pm
 */
public abstract class TextDecorator implements Text {
    protected Text decoratedText;

    public TextDecorator(Text decoratedText) {
        this.decoratedText = decoratedText;
    }

    @Override
    public String getContent() {
        return decoratedText.getContent();
    }
}

