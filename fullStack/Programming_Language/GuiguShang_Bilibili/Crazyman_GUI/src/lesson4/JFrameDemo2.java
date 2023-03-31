package lesson4;

import javax.swing.*;
import java.awt.*;

/**
 * @author xueshuo
 * @create 2023-03-31 8:56 pm
 */
public class JFrameDemo2 {
    public static void main(String[] args) {
        new MyJFrame().init();
    }
}

class MyJFrame extends JFrame{

    public void init(){

        this.setVisible(true);
        this.setBounds(100, 100, 200, 200);

        // 设置文字标签 (label)
        JLabel label = new JLabel("欢迎来到狂人说Java");
        this.add(label);

        // 让文本标签剧中
        label.setHorizontalAlignment(SwingConstants.CENTER);

        // 获得容器
        Container container = this.getContentPane();
        container.setBackground(Color.yellow);      // 容器的背景颜色才能显示

    }
}