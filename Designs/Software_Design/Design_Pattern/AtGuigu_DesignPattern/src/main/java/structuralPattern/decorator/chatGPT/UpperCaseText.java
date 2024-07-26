package structuralPattern.decorator.chatGPT;

/**
 * @author xueshuo
 * @create 2023-04-17 10:45 pm
 */
public class UpperCaseText extends TextDecorator {
    public UpperCaseText(Text decoratedText) {
        super(decoratedText);
    }

    @Override
    public String getContent() {
        return decoratedText.getContent().toUpperCase();
    }
}
