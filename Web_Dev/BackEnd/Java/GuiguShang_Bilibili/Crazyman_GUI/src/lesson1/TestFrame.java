package lesson1;

import java.awt.*;

/**
 * P3
 *
 * @author xueshuo
 * @create 2023-03-31 9:06 am
 */


// GUI 第一个界面
public class TestFrame {

    public static void main(String[] args) {
        // Frame  ---> JDK, 或看源码
        Frame frame = new Frame("my first Java GUI window!");

        // 需要设置可见性, width, height
        frame.setVisible(true);

        // 设置窗口大小
        frame.setSize(400, 400);

        // 设置颜色
        frame.setBackground(Color.black);

        // 弹出的初始位置
        frame.setLocation(200, 200);

        // 设置大小固定
        frame.setResizable(false);
    }
}
