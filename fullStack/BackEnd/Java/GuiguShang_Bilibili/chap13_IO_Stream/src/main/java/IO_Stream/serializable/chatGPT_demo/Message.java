package IO_Stream.serializable.chatGPT_demo;

/**
 * @author xueshuo
 * @create 2023-03-26 10:42 pm
 */
import java.io.Serializable;

public class Message implements Serializable {

   // private static final long serialVersionUID = 1L;

    private String content;
    private String sender;
    private String receiver;

    public Message(String content, String sender, String receiver) {
        this.content = content;
        this.sender = sender;
        this.receiver = receiver;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    @Override
    public String toString() {
        return "Message{" +
                "content='" + content + '\'' +
                ", sender='" + sender + '\'' +
                ", receiver='" + receiver + '\'' +
                '}';
    }
}
