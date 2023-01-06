package FileClass;

import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;


/**
 * https://www.bilibili.com/video/BV1Kb411W75N?p=580&vd_source=c6866d088ad067762877e4b6b23ab9df
 * 一个关于File class的常用方法的练习
 * test directory: "C:\\1_Java\\GuiguShang_Bilibili\\IO_Stream\\DirectoryForTest"
 *
 *
 */
public class FileTest2 {
    @Test
    public void test1() throws IOException {
        File file = new File("C:\\1_Java\\GuiguShang_Bilibili\\IO_Stream\\DirectoryForTest\\haha.txt");

        // 创建一个与file同目录下的另一个file, 名字为 test1.txt
        File file2 = new File(file.getParent(), "test1.txt");
        if(!file2.exists()){
            file2.createNewFile();
        }

    }
    @Test
    public void test2(){
        // 判断指定目录下是否有后缀名为.jpg的文件, 如果有, 输出它的名字
        String pathName = "C:\\1_Java\\GuiguShang_Bilibili\\IO_Stream\\DirectoryForTest";
        File file = new File(pathName);
        String[]  fileNameList = file.list();
        Arrays.stream(fileNameList).forEach(System.out::println);
        System.out.println("*******************************");
        Arrays.stream(fileNameList)
                .filter(s -> s.endsWith(".jpg"))
                .forEach(System.out::println);
    }

    @Test
    public void test3(){
        //  遍历指定目录所有的文件名称, 包括子文件目录中的文件  DFS?? iteration也能写
        //  拓展1: 计算指定目录占用空间大小
        //  拓展2: 删除指定文件目录及其下的所有文件
        String pathName = "C:\\1_Java\\GuiguShang_Bilibili\\IO_Stream\\DirectoryForTest";
        File fileRoot = new File(pathName);
        // System.out.println(fileRoot);

        DFSFile(fileRoot);
    }

    public static void DFSFile(File file){
        File[] fileList = file.listFiles();
        assert fileList != null;
        for(File f:fileList){
            if(file.isDirectory()){
                System.out.println(file.getName());
                DFSFile(f);
            }else{
                System.out.println(file.getName());
            }
        }

    }





}


