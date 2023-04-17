package structuralPattern.decorator.chatGPT;

/**
 * @author xueshuo
 * @create 2023-04-17 10:46 pm
 */
public class DecoratorExample {
    public static void main(String[] args) {
        // 就非常像I/O里套娃来实现更多功能
        Text plainText = new PlainText("hello");
        Text upperCaseText = new UpperCaseText(plainText);
        Text exclaimText = new ExclaimText(upperCaseText);

        System.out.println("Plain Text: " + plainText.getContent());
        System.out.println("Upper Case Text: " + upperCaseText.getContent());
        System.out.println("Exclaim Text: " + exclaimText.getContent());
    }
}
