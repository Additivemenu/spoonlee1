package test1; /**
 * @author xueshuo
 * @create 2023-04-04 10:08 am
 */
import java.io.Serializable;

public class WordRequest implements Serializable {
    private String word;

    public WordRequest(String word) {
        this.word = word;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }
}

