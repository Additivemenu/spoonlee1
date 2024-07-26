package lesson1;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 *
 * panel: 可以看成是一个空间, 但不能单独存在, 需要放在frame里
 *
 * @author xueshuo
 * @create 2023-03-31 9:23 am
 */
public class TestPanel {
    public static void main(String[] args) {
        Frame frame = new Frame();
        Panel panel = new Panel();

        // 设置布局
        frame.setLayout(null);

        // frame坐标 --------------------------------------
        frame.setBounds(300, 300, 500, 500);
        frame.setBackground(Color.green);

        // panel设置坐标 -----------------------------------
        panel.setBounds(50,50,400,400);
        panel.setBackground(Color.blue);

        frame.add(panel);
        frame.setVisible(true);

        // 监听事件, 监听窗口关闭事件 -------------------------
        // 适配器模式
        frame.addWindowListener(new WindowAdapter() {
            // 点击关闭的时候需要做的事情
            @Override
            public void windowClosing(WindowEvent e) {
                // 结束程序
                System.exit(0);     // 正常退出
            }
        });
    }

}
