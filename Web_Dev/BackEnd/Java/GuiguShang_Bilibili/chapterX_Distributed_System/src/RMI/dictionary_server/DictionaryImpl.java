package RMI.dictionary_server;

/**
 * @author xueshuo
 * @create 2023-04-24 10:30 am
 */
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

public class DictionaryImpl extends UnicastRemoteObject implements Dictionary {
    private Map<String, String> words;

    public DictionaryImpl() throws RemoteException {
        super();
        words = new ConcurrentHashMap<>();
    }

    public void addWord(String word, String meaning) {
        words.put(word, meaning);
    }

    public String getMeaning(String word) {
        return words.getOrDefault(word, "Word not found.");
    }

    public Map<String, String> getWords() {
        return words;
    }
}

