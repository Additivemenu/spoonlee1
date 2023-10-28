package lesson4;

import javax.swing.*;
import java.awt.*;

/**
 * @author xueshuo
 * @create 2023-03-31 8:47 pm
 */
public class JFrameDemo {

    //
    public void init(){
        //
        JFrame jframe = new JFrame("this is a JFrame window");
        jframe.setVisible(true);
        jframe.setBounds(100, 100, 200, 200);
        jframe.setBackground(Color.blue);       // frame的颜色不能被显示, 需要容器 (见demo2)

        // 设置文字
        JLabel label = new JLabel("welcome to 狂神说Java");
        jframe.add(label);

        // 容器

        // 关闭事件
        jframe.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);


    }

    public static void main(String[] args) {
        // 建立一个窗口
        new JFrameDemo().init();

    }
}
