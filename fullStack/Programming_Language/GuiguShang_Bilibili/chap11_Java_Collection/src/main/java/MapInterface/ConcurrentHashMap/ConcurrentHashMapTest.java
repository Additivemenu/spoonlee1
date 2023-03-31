package MapInterface.ConcurrentHashMap;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author xueshuo
 * @create 2023-03-30 8:22 pm
 */
public class ConcurrentHashMapTest {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        AtomicInteger sharedId = new AtomicInteger(0);       // JUC 原子类

        // Create two threads that will access the same ConcurrentHashMap object
        Thread t1 = new Thread(() -> {
            for (int i = 1; i <= 100; i++) {
                map.put("t1: Key" + i, i);
                sharedId.getAndIncrement();
                System.out.println(Thread.currentThread().getName()+" just put its "+i+" th key, sharedId:"+ sharedId.get());
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 1; i <= 100; i++) {
                map.put("t2: Key" + i, i);
                sharedId.getAndIncrement();
                System.out.println(Thread.currentThread().getName()+" just put its "+i+" th key, sharedId:"+ sharedId.get());
            }
        });

        // set name
        t1.setName("t1");
        t2.setName("t2");

        // Start both threads
        t1.start();
        t2.start();

        // Wait for both threads to finish
        try {
            t1.join();      // wait for t1 to finish, then proceed with main thread
            System.out.println("t1 finished ------------------------");
            t2.join();      // wait for t2 to finish, then proceed with main thread
            System.out.println("t2 finished ------------------------");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Check the size of the map
        System.out.println("Size of ConcurrentHashMap: " + map.size());

//        // Get an Iterator for the entry set of the HashMap
//        Iterator<Map.Entry<String, Integer>> iterator = map.entrySet().iterator();
//
//        // Iterate through the HashMap using the Iterator
//        while (iterator.hasNext()) {
//            Map.Entry<String, Integer> entry = iterator.next();
//            System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
//        }

    }
}
