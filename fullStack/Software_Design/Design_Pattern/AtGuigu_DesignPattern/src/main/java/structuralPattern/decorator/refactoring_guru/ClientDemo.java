package structuralPattern.decorator.refactoring_guru;

import structuralPattern.decorator.refactoring_guru.decorators.CompressionDecorator;
import structuralPattern.decorator.refactoring_guru.decorators.DataSourceDecorator;
import structuralPattern.decorator.refactoring_guru.decorators.EncryptionDecorator;

/**
 * ⚠️ 要运行下面代码, 先确保有out/OutputDemo.txt 这个文件
 *
 * This example shows how you can adjust the behavior of an object without changing its code.
 *
 * Initially, the business logic class could only read and write data in plain text. Then we
 * created several small wrapper classes that add new behavior after executing standard operations
 * in a wrapped object.
 *
 * The first wrapper encrypts and decrypts data, and the second one compresses and extracts data.
 *
 * @author xueshuo
 * @create 2023-04-26 2:14 pm
 */

public class ClientDemo {
    public static void main(String[] args) {
        String salaryRecords = "Name,Salary\nJohn Smith,100000\nSteven Jobs,912000";

        DataSourceDecorator encoded = new CompressionDecorator(
                new EncryptionDecorator(
                        new FileDataSource("./out/OutputDemo.txt")));
        encoded.writeData(salaryRecords);    // 这个writeData的功能 既encrypt 又 compress

        DataSource plain = new FileDataSource("./out/OutputDemo.txt");

        System.out.println("- Input ----------------");
        System.out.println(salaryRecords);
        System.out.println("- Encoded --------------");
        System.out.println(plain.readData());
        System.out.println("- Decoded --------------");
        System.out.println(encoded.readData());
    }
}
