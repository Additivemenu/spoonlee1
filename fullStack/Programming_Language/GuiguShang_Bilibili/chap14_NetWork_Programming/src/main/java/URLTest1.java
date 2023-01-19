import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * @author xueshuo
 * @create 2023-01-19 5:38 pm
 */
public class URLTest1 {

    /**
     * 下载url对应的资源
     * @param args
     */
    public static void main(String[] args)  {
        HttpURLConnection urlConnection = null;
        InputStream is = null;
        FileOutputStream fos = null;
        try {
            // get urlConnection (类似Socket的东西)
            // 这里github似乎对png文件压缩过, 直接下载似乎格式不对, 意思是这个意思
            URL url = new URL("https://github.com/Additivemenu/spoonlee1/blob/master/fullStack/Src_img/vs_shortcut_mac.png");
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.connect();

            // 边读边写
            is = urlConnection.getInputStream();
            fos = new FileOutputStream("chap14_NetWork_Programming//URL_test.png");     // main中相对路径是针对整个project

            byte[] buffer = new byte[1024];
            int len;
            while((len = is.read(buffer)) != -1){
                fos.write(buffer, 0, len);
            }

            System.out.println("download compete!");

        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // close resource
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
        }




    }
}
