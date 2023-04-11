package IO_Stream.serializable.import_export_jackson;

/**
 * 序列化和反序列化export 对象到文件, 文件是binary file
 * 利用jackson 第三方包, 可以将对象以jason 格式export到文件
 * 注意: 这里似乎是class path又点问题, 另外再单独开一个 project 相同操作就可以正常运行了
 *
 * @author xueshuo
 * @create 2023-04-02 11:08 am
 */

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class HashMapJsonImportExport {
    public static void main(String[] args) {
        // Create a HashMap
        HashMap<String, Integer> hashMap = new HashMap<>();
        hashMap.put("One", 1);
        hashMap.put("Two", 2);
        hashMap.put("Three", 3);

        // Export the HashMap to a JSON file
//        String filePath = "./chap13_IO_Stream/src/main/java/IO_Stream/serializable" +
//                "/import_export_to_jackson/HashMap.json";
        String filePath = "HashMap.json";
        exportHashMap(hashMap, filePath);

        // Import the HashMap from the JSON file
        HashMap<String, Integer> importedHashMap = importHashMap(filePath);
        System.out.println("Imported HashMap: " + importedHashMap);
    }

    public static void exportHashMap(Map<String, Integer> hashMap, String filePath) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(new File(filePath), hashMap);
            System.out.println("HashMap successfully written to JSON file: " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static HashMap<String, Integer> importHashMap(String filePath) {
        HashMap<String, Integer> hashMap = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            hashMap = objectMapper.readValue(new File(filePath), new TypeReference<HashMap<String, Integer>>() {});
        } catch (IOException e) {
            e.printStackTrace();
        }
        return hashMap;
    }
}
