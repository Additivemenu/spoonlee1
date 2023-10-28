package lesson1.layout;

import java.awt.*;

/**
 * P5
 * @author xueshuo
 * @create 2023-03-31 9:42 am
 */
public class TestFlowLayout {
    public static void main(String[] args) {
        Frame frame = new Frame();

        // 组件-按钮
        Button button1 = new Button("button1");
        Button button2 = new Button("button2");
        Button button3 = new Button("button3");

        // 设置为flow layout
//        frame.setLayout(new FlowLayout());
//        frame.setLayout(new FlowLayout(FlowLayout.LEFT));
        frame.setLayout(new FlowLayout(FlowLayout.RIGHT));

        frame.setSize(200, 200);

        frame.add(button1);
        frame.add(button2);
        frame.add(button3);

        //
        frame.setVisible(true);
    }

}
