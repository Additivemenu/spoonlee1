package FileClass;

import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.util.Date;

/**
 * File类的使用
 * 1. File class的object, 代表一个文件或文件目录(俗称文件夹)
 * 2. File class is under java.io package
 * 3. FIle class中涉及到关于file or file directory的create, delete, rename, modifiedTime, length等方法
 *                但并未涉及到read/write file content的操作, 这些是I/O stream的操作
 *
 *
 */

public class FileTest {
    /**
     * 1. 创建File class的instance
     *      File(String filePath)
     *      File(String parentPath, String childPath)
     *      File(File parentFile, String childPath)
     * 2. 相对路径:   你懂的
     *    绝对路径:
     *
     * 3. 路径分隔符
     *    windows: \\
     *    unix: /
     *
     */
    @Test
    public void test1(){
        // constructor 1:
        File file1 = new File("hello.txt");     // 相对于当前module
        File file2 = new File("C:\\1_Java\\GuiguShang_Bilibili\\IO_Stream\\src\\main\\java\\FileClass\\helloAbs.txt");        // 绝对路径

        System.out.println(file1);
        System.out.println(file2);

        // constructor 2:
        File file3 = new File("C:\\1_Java", "GuiguShang_Bilibili");
        System.out.println(file3);

        // constructor 3:
        File file4 = new File(file3, "hi.txt");
        System.out.println(file4);

    }

    /**
     * File class的获取操作
     * + `public String getAbsolutePath()`
     * + `public String getPath()`
     * + `public String getName()`
     * + `public String getParent`: 获取上层文件的目录路径. 若无, 返回null
     * + `public long length()`: 获取文件长度(in bytes). 不能获取目录长度
     * + `public long lastModified()`: 获取最后一次修改时间, 毫秒值
     *
     *
     */
    @Test
    public void test2(){
        File file1 = new File("helloTest2.txt");        // 相对于当前Module(即IO_Stream)的路径
        File file2 = new File("C:\\1_Java\\GuiguShang_Bilibili\\IO_Stream\\src\\main\\java\\FileClass\\helloAbsTest2.txt");

        System.out.println(file1.getAbsolutePath());
        System.out.println(file1.getPath());
        System.out.println(file1.getName());
        System.out.println( file1.getParent());             // null
        System.out.println(file1.length());                 // 0 if empty file or no file
        System.out.println(new Date(file1.lastModified()));

        System.out.println("********************************");
        System.out.println(file2.getAbsolutePath());
        System.out.println(file2.getPath());
        System.out.println(file2.getName());
        System.out.println( file2.getParent());             // C:\1_Java\GuiguShang_Bilibili\IO_Stream\src\main\java\FileClass
        System.out.println(file2.length());
        System.out.println(file2.lastModified());

    }

    /**
     *   `public String[] list()`: 获取指定目录下的所有文件或者文件目录的名称数组
     *   `public File[] listFiles()`: 获取指定目录下的所有文件或者文件目录的File数组
     */
    @Test
    public void test3(){
        File file = new File("C:\\1_Java\\GuiguShang_Bilibili\\IO_Stream");     // if file path doesn't exist, it will throw NullPointerException

        String[] list = file.list();            // list的元素只是file的name
        for(String s : list){
            System.out.println(s);
        }

        System.out.println("********************************");
        File[] files = file.listFiles();        // files的元素是绝对路径的形式
        for(File f:files){
            System.out.println(f);
        }

    }

    /**
     * `public boolean renameTo(File dest)`: 把文件重命名为指定的文件路径
     * e.g. file1.renameTo(file2)
     *          想要保证返货true(重命名成功), 需要file1代表的文件实际存在, 且file2代表的文件不存在
     */
    @Test
    public void test4(){
        File file1 = new File("helloTest333333.txt");
        File file2 = new File("C:\\1_Java\\GuiguShang_Bilibili\\IO_Stream\\helloTest4.txt");

        boolean renameTo = file1.renameTo(file2);
        System.out.println(renameTo);

    }

    /**
     *
     * + `public boolean isDirectory()`: 判断是否在文件目录
     * + `public boolean isFile()`: 判断是否是文件
     * + `public boolean exists()`: 判断是否存在
     * + `public boolean canRead()`: 判断是否可读
     * + `public boolean canWrite()`: 判断是否可写
     * + `public boolean isHidden()`: 判断是否隐藏
     */
    @Test
    public void test5(){
        File file1 = new File("helloTest5.txt");
        // file1 = new File("aaaaa");
        System.out.println(file1.isDirectory());        // false
        System.out.println(file1.isFile());             // true
        System.out.println(file1.exists());
        System.out.println(file1.canRead());
        System.out.println(file1.canWrite());
        System.out.println(file1.isHidden());

        System.out.println("******************************************************");
        File file2 = new File("C:\\1_Java\\GuiguShang_Bilibili\\IO_Stream\\");
        System.out.println(file2.isDirectory());        // true
        System.out.println(file2.isFile());             // false
        System.out.println(file2.exists());             // true
        System.out.println(file2.canRead());
        System.out.println(file2.canWrite());
        System.out.println(file2.isHidden());
    }

    /**
     * File class的创建功能
     * + `public boolean createNewFile()`: 创建文件. 若文件已经存在, 则不创建, 并返回false;
     * + `public boolean mkdir()`: 创建文件目录(文件夹). 如果此文件目录存在, 就不创建了. 如果此文件目录的上层目录不存在, 也不创建.
     * + `public boolean mkdirs()`: 创建文件目录(文件夹). 如果上层文件目录不存在, 一并创建.
     *
     * File class的删除功能
     *      *     `public boolean delete()`: 删除文件或文件夹
     */
    @Test
    public void test6() throws IOException {
        // file 的创建 --------------------------------------------
        File file1 = new File("hi.txt");
        if(!file1.exists()){
            file1.createNewFile();
            System.out.println("create the file successfully");
        }else{
            file1.delete();
            System.out.println("delete the file sucessfully");
        }
    }

    /**
     *
     */
    @Test
    public void test7(){
        // file directory的创建 -----------------------------------
        File file1 = new File("C:\\1_Java\\GuiguShang_Bilibili\\IO_Stream\\DirectoryForTest1");
        boolean mkdir = file1.mkdir();
        if(mkdir){
            System.out.println("mkdir: create directory successfully!");
        }
        System.out.println("*********************************************************");
        File file2 = new File("C:\\1_Java\\GuiguShang_Bilibili\\IO_Stream\\DirectoryForTest1\\a1\\b1");
        boolean mkdir2 = file2.mkdirs();
        if(mkdir2){
            System.out.println("mkdirs: create directory successfully!");
        }



    }

}
