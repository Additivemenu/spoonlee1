package jackson.text;

import java.io.Serializable;

/**
 * @author xueshuo
 * @create 2023-05-20 6:51 am
 */
public class Text implements Serializable {
    private String textContent;
    private int fontSize;

    public Text(String textContent, int fontSize) {
        this.textContent = textContent;
        this.fontSize = fontSize;
    }

    @Override
    public String toString() {
        return "Text{" +
                "textContent='" + textContent + '\'' +
                ", fontSize=" + fontSize +
                '}';
    }
}
