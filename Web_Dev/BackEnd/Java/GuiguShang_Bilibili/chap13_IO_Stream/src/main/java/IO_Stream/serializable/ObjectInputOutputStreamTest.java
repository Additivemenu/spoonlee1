package IO_Stream.serializable;

import org.junit.Test;

import java.io.*;

/**
 * 609 - 613
 * 对象流的使用
 * 1. ObjectInputStream,  ObjectOutputStream
 * 2. 作用: 与数据流相对应, 将基本数据类型data和对象data从程序export到file, 或读取file中的基本数据类型data和对象data
 * 3. 支持序列化的class必须implement:
 *          3.1 serializable (一个标识接口, 没有任何abstract method)
 *          3.2 但当前类需要提供一个全局常量: seriablVersionUID 用来标记识别到底是哪个class(在网络编程中尤为重要)
 *          3.3 同时当前类内部的instance variable也必须implement serializable
 * 4. 补充:  `ObjectOutputStream`和`ObjectInputStream`不能序列化和反序列化`static`和`transient`修饰的成员变量
 */
public class ObjectInputOutputStreamTest {

    /**
     * 序列化: 将内存中的Object转化为二进制流, 以存在hard drive或通过网络传输到另外的网络节点
     * 注意序列化产生的文件人是看不懂的, 得通过反序列化才能读入内存操作
     */
    @Test
    public void testObjectOutputStream() {
        ObjectOutputStream oos = null;
        try {
            // 1,2
            oos = new ObjectOutputStream(new FileOutputStream("object.dat"));

            // 3
            oos.writeObject(new String("I am Iron man!"));
            oos.flush();        //刷新操作

            oos.writeObject(new Person("Tony Stark", 45));
            oos.flush();

            oos.writeObject(new Person("Bruce Wayne", 35, new Account(1000000)));
            oos.flush();

        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // 4
            if (oos != null) {
                try {
                    oos.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    /**
     * 反序列化: 将磁盘文件中的对象还原为内存中的Java对象
     * ObjectInputStream
     *
     */
    @Test
    public void testObjectInputStream()  {
        ObjectInputStream ois = null;
        try {
            // 1,2
            ois = new ObjectInputStream(new FileInputStream("object.dat"));
            // 3
            Object obj = ois.readObject();
            String str = (String) obj;

            Person p1 = (Person) ois.readObject();
            Person p2 = (Person) ois.readObject();

            System.out.println(str);
            System.out.println(p1);
            System.out.println(p2);

        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            // 4
            if (ois != null) {
                try {
                    ois.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }


}
