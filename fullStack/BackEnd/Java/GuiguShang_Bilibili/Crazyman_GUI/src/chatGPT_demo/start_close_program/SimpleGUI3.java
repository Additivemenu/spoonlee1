package chatGPT_demo.start_close_program;

/**
 * 点击start, 启动一个infinite loop
 * 点击close, 结束infinite loop
 *
 * @author xueshuo
 * @create 2023-04-02 3:33 pm
 */
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.concurrent.atomic.AtomicBoolean;

public class SimpleGUI3 {
    private static AtomicBoolean shouldRun = new AtomicBoolean(false);

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> createAndShowGUI());
    }

    private static void createAndShowGUI() {
        JFrame frame = new JFrame("Simple GUI");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(300, 200);

        JPanel panel = new JPanel(new FlowLayout());

        JButton startButton = new JButton("Start");
        startButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                shouldRun.set(true);

                new Thread(() -> {
                    while (shouldRun.get()) {
                        // Your infinite loop code here
                        System.out.println("Running...");

                        try {
                            Thread.sleep(1000);
                        } catch (InterruptedException ex) {
                            ex.printStackTrace();
                        }
                    }

                    System.out.println("already exit from infinite loop");

                }).start();
            }
        });

        JButton closeButton = new JButton("Close");
        closeButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                shouldRun.set(false);
            }
        });

        panel.add(startButton);
        panel.add(closeButton);

        frame.getContentPane().add(panel);
        frame.setVisible(true);
    }
}

