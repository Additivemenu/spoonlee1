package lesson1;

import java.awt.*;

/**
 * 弹出多个窗口
 *
 * @author xueshuo
 * @create 2023-03-31 9:16 am
 */
public class TestFrame2 {

    public static void main(String[] args) {
        // 展示多个窗口
        MyFrame myFrame1 = new MyFrame(100, 100, 200, 200, Color.blue);
        MyFrame myFrame2 = new MyFrame(300, 100, 200, 200, Color.yellow);
        MyFrame myFrame3 = new MyFrame(500, 100, 200, 200, Color.pink);
        MyFrame myFrame4 = new MyFrame(700, 100, 200, 200, Color.green);
    }
}


class MyFrame extends Frame {
    static int id = 0;  // 可能存在多个窗口, 需要计数器

    public MyFrame(int x, int y, int width, int height, Color color){
        super("My frame" + (++id));

        setBounds(x, y, width, height);
        setBackground(color);
        setVisible(true);
    }

}
