package IO_Stream.Practice;

import org.testng.annotations.Test;

import java.io.*;
import java.sql.SQLOutput;

public class PicTest {

    // encryption on a picture
    @Test
    public void test1() {
        FileInputStream fis = null;
        FileOutputStream fos = null;
        try {
            // 1,2 instantiate stream based on file
            fis = new FileInputStream(new File("Dva.jpg"));
            fos = new FileOutputStream(new File("Dva_encrypted.jpg"));

            // 3 read & write
            byte[] buffer = new byte[20];
            int len;
            while((len = fis.read(buffer)) != -1){
                // modify byte[]
    //            // 错误写法!!!!
    //            for(byte b:buffer){
    //                b = (byte) (b^5);       // 增强for loop是deep copy 原数组, b 并不指向原数组, 因此原数组并没有被改变!!!
    //            }
                // rightful !!!
                for(int i=0; i<len;i++){
                    buffer[i] = (byte) (buffer[i]^5);           // Encryption: XOR
                }
                fos.write(buffer, 0, len);
            }

            System.out.println("Encryption succeed!");

        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // 4 close
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    // decryption of pic
    @Test
    public void test2(){
        FileInputStream fis = null;
        FileOutputStream fos = null;
        try {
            // 1,2 instantiate stream based on file
            fis = new FileInputStream(new File("Dva_encrypted.jpg"));
            fos = new FileOutputStream(new File("Dva_encrypted_decrypted.jpg"));

            // 3 read & write
            byte[] buffer = new byte[20];
            int len;
            while((len = fis.read(buffer)) != -1){
                // modify byte[]
                //            // 错误写法!!!!
                //            for(byte b:buffer){
                //                b = (byte) (b^5);       // 增强for loop是deep copy 原数组, b 并不指向原数组, 因此原数组并没有被改变!!!
                //            }
                // rightful !!!
                for(int i=0; i<len;i++){
                    buffer[i] = (byte) (buffer[i]^5);           // Encryption: XOR
                }
                fos.write(buffer, 0, len);
            }

            System.out.println("Encryption succeed!");
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // 4 close
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }



}
