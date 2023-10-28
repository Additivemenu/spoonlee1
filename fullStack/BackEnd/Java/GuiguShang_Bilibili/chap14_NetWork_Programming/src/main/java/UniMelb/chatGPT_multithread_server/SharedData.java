package UniMelb.chatGPT_multithread_server;

/**
 * @author xueshuo
 * @create 2023-03-25 4:45 pm
 */
public class SharedData {
    private int value = 0;

    public synchronized void increment() {
        value++;
    }

    public synchronized int getValue() {
        return value;
    }
}

