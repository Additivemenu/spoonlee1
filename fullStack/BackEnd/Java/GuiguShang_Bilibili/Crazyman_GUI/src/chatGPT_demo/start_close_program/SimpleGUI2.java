package chatGPT_demo.start_close_program;

/**
 * @author xueshuo
 * @create 2023-04-02 3:26 pm
 */
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SimpleGUI2 {
    private static Timer timer;
    private static int counter = 1;

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
                counter = 1;
                timer = new Timer(1000, new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        if (counter <= 100) {
                            System.out.println(counter);
                            counter++;
                        } else {
                            timer.stop();
                        }
                    }
                });
                timer.start();
            }
        });

        JButton closeButton = new JButton("Close");
        closeButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (timer != null) {
                    timer.stop();
                }
            }
        });

        panel.add(startButton);
        panel.add(closeButton);

        frame.getContentPane().add(panel);
        frame.setVisible(true);
    }
}

