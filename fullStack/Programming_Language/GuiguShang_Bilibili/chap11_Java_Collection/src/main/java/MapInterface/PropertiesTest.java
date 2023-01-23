package MapInterface;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * @author xueshuo
 * @create 2023-01-23 3:17 pm
 */
public class PropertiesTest {

    // Properties: 结合IO流来处理配置文件. key和value都是String类型
    public static void main(String[] args) {
        FileInputStream fis = null;
        try {
            // IO stream step1: file class
            Properties pros = new Properties();
            // 然后手动在project下创建jdbc.properties 文件, 写入
            //name=Tom
            //password=abc123
            // =两边别写空格

            // IO stream step2: generate stream given file
            fis = new FileInputStream("jdbc.properties");

            // IO stream step3: load stream
            pros.load(fis); // 加载对应流的文件, 注意文件的编码应该和IDEA的编码匹配(尤其是文件中存在中文时)
            String name = pros.getProperty("name");
            String password = pros.getProperty("password");

            System.out.println("name = " + name + ", password = " + password );
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // IO stream step4: close resource
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

}
