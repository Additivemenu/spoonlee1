package IO_Stream.file_stream;

import org.testng.annotations.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Test FileInputStream  FileOutputStream
 * Pinciple:
 * 1. For txt file(.txt, .java, .c, .cpp), use char stream
 * 2. For non-txt file(.jpg, .mp4, .mp3, .doc, .ppt), use byte stream
 *
 */

public class FileInputOutputStreamTest {


    // Demonstration: use byte stream to process txt file, it is possibly to generate messy code
    @Test
    public void testFileInputStream()  {
        FileInputStream fis = null;
        try {
            // 1.
            File file = new File("hello.txt");      // UTF-8中一个英文字母是1个byte的, 但是中文一个字要用3个byte, 因此这里不能处理中文

            // 2.
            fis = new FileInputStream(file);

            // 3.
            byte[] buffer = new byte[5];
            int len;
            while((len=fis.read(buffer))!= -1){
                String str = new String(buffer, 0, len);
                System.out.print(str);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if(fis != null){
                // 4. close
                try {
                    fis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    /**
     * copy .jpg file
     */
    @Test
    public void testFileInputOutputStream() throws IOException {
        FileInputStream fis = null;
        FileOutputStream fos = null;
        try {
            // 1
            File srcFile = new File("Dva.jpg");
            File destFile = new File("Dva_copy.jpg");

            // 2
            fis = new FileInputStream(srcFile);
            fos = new FileOutputStream(destFile);

            // 3
            byte[] buffer = new byte[5];
            int len;
            while((len = fis.read(buffer))!=-1){
                fos.write(buffer, 0, len);      // 读了几个byte, 写几个btye
            }
            System.out.println("copy "+srcFile+" succeed!");
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // 4
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            if (fis !=null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

    }

    /**
     * Demo: copy the file in the specified path
     *
     */
    public void copyFile(String srcPath, String destPath){
        FileInputStream fis = null;
        FileOutputStream fos = null;
        try {
            // 1
            File srcFile = new File(srcPath);
            File destFile = new File(destPath);

            // 2
            fis = new FileInputStream(srcFile);
            fos = new FileOutputStream(destFile);

            // 3
            byte[] buffer = new byte[1024];
            int len;
            while((len = fis.read(buffer))!=-1){
                fos.write(buffer, 0, len);      // 读了几个byte, 写几个btye
            }
            System.out.println("copy "+srcFile+" succeed!");
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // 4
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            if (fis !=null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    /**
     * CopyFile虽然使用的是byte stream来实现, 但是它也可以用来复制txt file, 因为这个函数本身只是搬运1,0 我们并没有在read,write过程中打印
     * 但最好还是区分开来用
     */
    @Test
    public void testCopyFile(){
        long start = System.currentTimeMillis();

        String srcPath = "C:\\1_Java\\Beijing.MOV";
        String destPath = "C:\\1_Java\\Beijing_copy.MOV";
        copyFile(srcPath, destPath);

        long end = System.currentTimeMillis();
        System.out.println("copy time is: "+ (end-start)+" ms");        // 1762ms buffer的大小也会影响处理时间
    }


}
