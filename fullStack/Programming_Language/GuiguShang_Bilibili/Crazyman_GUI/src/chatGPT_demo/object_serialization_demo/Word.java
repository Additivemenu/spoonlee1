package chatGPT_demo.object_serialization_demo;

/**
 * @author xueshuo
 * @create 2023-03-31 9:27 pm
 */
import java.io.Serializable;
import java.util.ArrayList;

public class Word implements Serializable {
    private String name;
    private ArrayList<String> meanings;

    public Word(String name, ArrayList<String> meanings) {
        this.name = name;
        this.meanings = meanings;
    }

    public String getName() {
        return name;
    }

    public ArrayList<String> getMeanings() {
        return meanings;
    }

    @Override
    public String toString() {
        return "Word [name=" + name + ", meanings=" + meanings + "]";
    }
}

