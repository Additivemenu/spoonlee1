package lesson1.layout.practice;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * @author xueshuo
 * @create 2023-03-31 10:25 am
 */
public class ExDemo {

    public static void main(String[] args) {
        Frame frame = new Frame();

        frame.setSize(500,300);
        frame.setLocation(300,400);
        frame.setVisible(true);
        frame.setLayout(new GridLayout(2,1));

        // 4 个 panel
        Panel p1 = new Panel(new BorderLayout());
        Panel p2 = new Panel(new GridLayout(2,1));

        Panel p3 = new Panel(new BorderLayout());
        Panel p4 = new Panel(new GridLayout(2,2));

        // frame上半部分 ----------------------------------------------
        p1.add(new Button("East - 1"), BorderLayout.EAST);
        p1.add(new Button("West - 1"), BorderLayout.WEST);
        // 中间
        p2.add(new Button("p2-btn-1"));
        p2.add(new Button("p2-btn-2"));
        p1.add(p2, BorderLayout.CENTER);

        // frame下半部分 ----------------------------------------------
        p3.add(new Button("East - 2"), BorderLayout.EAST);
        p3.add(new Button("West - 2"), BorderLayout.WEST);
        // 中间
        for(int i = 0; i < 4; i++){
            p4.add(new Button("for-" + i));
        }
        p3.add(p4, BorderLayout.CENTER);

        frame.add(p1);
        frame.add(p3);

        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
    }
}
