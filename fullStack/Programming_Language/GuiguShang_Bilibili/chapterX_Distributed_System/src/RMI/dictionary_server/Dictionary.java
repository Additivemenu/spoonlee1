package RMI.dictionary_server;

/**
 * @author xueshuo
 * @create 2023-04-24 10:31 am
 */
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.Map;

public interface Dictionary extends Remote {
    void addWord(String word, String meaning) throws RemoteException;
    String getMeaning(String word) throws RemoteException;
    Map<String, String> getWords() throws RemoteException;
}

