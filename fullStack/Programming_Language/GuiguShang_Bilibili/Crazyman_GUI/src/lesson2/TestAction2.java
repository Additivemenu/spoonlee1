package lesson2;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * P7
 * @author xueshuo
 * @create 2023-03-31 10:53 am
 */
public class TestAction2 {

    public static void main(String[] args) {
        // 两个按钮, 实现同一个监听
        // 开始 停止
        Frame frame = new Frame("start - stop");

        Button btn_start = new Button("start");
        Button btn_stop = new Button("stop");

        // 可以显式定义触发会返回的信息, 如果不显式定义, 则返回默认值
        btn_stop.setActionCommand("this is button: stop");

        MyMonitor myMonitor = new MyMonitor();
        btn_start.addActionListener(myMonitor);
        btn_stop.addActionListener(myMonitor);

        frame.add(btn_start, BorderLayout.NORTH);
        frame.add(btn_stop, BorderLayout.SOUTH);

        frame.pack();
        frame.setVisible(true);
    }
}

class MyMonitor implements ActionListener{

    @Override
    public void actionPerformed(ActionEvent e) {
        //
        System.out.println("the button is clicked, msg: "+ e.getActionCommand());       // 获取按钮信息

        //
        if(e.getActionCommand().equals("start")){
            System.out.println("this is start button! do something for start button ...");
        }

    }
}