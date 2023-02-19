package class02_class;

import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * @author xueshuo
 * @create 2023-02-19 5:01 pm
 */
public class ClassLoaderTest {


    /**
     * 需求: 通过ClassLoader加载指定的配置文件
     * JDK 9 之后还支持吗?
     */
    @Test
    public void test3() throws IOException {
        Properties pros = new Properties();

        // 通过类的加载器读取的文件的默认的路径为: 当前module的src下
        // JDK17改了默认路径在main > resource那里
        InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("info1.properties");

        pros.load(is);

        String name = pros.getProperty("name");
        String password = pros.getProperty("password");
        System.out.println(name + ", " + password);
    }

    @Test
    public void test4() throws IOException {
        Properties pros = new Properties();

        /// 读取的文件的默认的路径为:当前module下
        FileInputStream is = new FileInputStream(new File("info.properties"));

        pros.load(is);

        String name = pros.getProperty("name");
        String password = pros.getProperty("password");
        System.out.println(name + ", " + password);
    }


}
