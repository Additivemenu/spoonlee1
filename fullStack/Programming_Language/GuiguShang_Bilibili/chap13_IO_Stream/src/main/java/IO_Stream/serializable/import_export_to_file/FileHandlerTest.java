package IO_Stream.serializable.import_export_to_file;

/**
 * @author xueshuo
 * @create 2023-04-02 10:59 am
 */
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.HashMap;
import java.util.Map;

public class FileHandlerTest {
    public static void main(String[] args) {
        // Create a HashMap
        HashMap<String, Integer> hashMap = new HashMap<>();
        hashMap.put("One", 1);
        hashMap.put("Two", 2);
        hashMap.put("Three", 3);

        // Export the HashMap to a file
        String filePath = "./chap13_IO_Stream/src/main/java/IO_Stream/serializable" +
                "/import_export_to_file/HashMap.ser";            // main 方法 默认路径是在整个project下面
        exportHashMap(hashMap, filePath);

        // Import the HashMap from the file
        HashMap<String, Integer> importedHashMap = importHashMap(filePath);
        System.out.println("Imported HashMap: " + importedHashMap);
    }

    public static void exportHashMap(Map<String, Integer> hashMap, String filePath) {
        try (FileOutputStream fileOutputStream = new FileOutputStream(filePath);
             ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream)) {

            // Write the HashMap to the ObjectOutputStream
            objectOutputStream.writeObject(hashMap);
            System.out.println("HashMap successfully written to file: " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static HashMap<String, Integer> importHashMap(String filePath) {
        HashMap<String, Integer> hashMap = null;
        try (FileInputStream fileInputStream = new FileInputStream(filePath);
             ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream)) {

            // Read the HashMap from the ObjectInputStream
            hashMap = (HashMap<String, Integer>) objectInputStream.readObject();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return hashMap;
    }
}

