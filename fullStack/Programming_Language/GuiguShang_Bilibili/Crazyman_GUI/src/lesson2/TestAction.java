package lesson2;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * @author xueshuo
 * @create 2023-03-31 10:43 am
 */
public class TestAction {
    // 按下按钮的时候, 触发事件
    public static void main(String[] args) {
        Frame frame = new Frame();

        // button
        Button button = new Button("click me");
        button.addActionListener(new MyActionListener());

        // 文本框 也可以

        frame.add(button, BorderLayout.CENTER);
        frame.setSize(500,500);
        // frame.pack();

        windowClose(frame);
        frame.setVisible(true);
    }

    // 封装 关闭窗体的事件
    private static void windowClose(Frame frame){
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
    }
}


// ActionListner 是函数式接口, 可以用lambda 表达式
class MyActionListener implements ActionListener {

    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("aaaa");
    }
}