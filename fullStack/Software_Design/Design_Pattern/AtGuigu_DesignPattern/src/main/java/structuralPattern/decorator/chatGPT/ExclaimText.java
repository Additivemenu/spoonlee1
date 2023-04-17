package structuralPattern.decorator.chatGPT;

/**
 * @author xueshuo
 * @create 2023-04-17 10:45 pm
 */
public class ExclaimText extends TextDecorator {
    public ExclaimText(Text decoratedText) {
        super(decoratedText);
    }

    @Override
    public String getContent() {
        return decoratedText.getContent() + "!";
    }
}
