package MapInterface.chatGPT;

import java.util.HashMap;
import java.util.Optional;

/**
 * @author xueshuo
 * @create 2023-04-16 10:59 am
 */
public class HashMapTest1 {

    public static void main(String[] args) {
        HashMap<Double, Double> hashMap = new HashMap<>();
        hashMap.put(1.0, 3.5);
        hashMap.put(2.0, 1.5);
        hashMap.put(3.0, 5.5);
        hashMap.put(4.0, 1.5);

        Optional<Double> minValue = hashMap.values().stream().min(Double::compare);

        HashMap<Double, Double> filteredMap = new HashMap<>();
        if (minValue.isPresent()) {
            double min = minValue.get();
            hashMap.entrySet().stream()
                    .filter(entry -> entry.getValue() == min)
                    .forEach(entry -> filteredMap.put(entry.getKey(), entry.getValue()));
        }

        System.out.println("Filtered HashMap with all minimum value entries:");
        filteredMap.forEach((key, value) -> System.out.println("Key: " + key + ", Value: " + value));
    }
}
