package chatGPT_demo.nav_bar;

/**
 * @author xueshuo
 * @create 2023-04-01 12:36 pm
 */
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SwingExample {

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new SwingExample2().createAndShowGUI());
    }

    public void createAndShowGUI() {
        JFrame frame = new JFrame("Swing Example");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(500, 300);

        // Create the nav bar panel
        JPanel navBarPanel = new JPanel(new GridLayout(4, 1));
        JButton button1 = new JButton("1");
        JButton button2 = new JButton("2");
        JButton button3 = new JButton("3");
        JButton button4 = new JButton("4");

        // Add buttons to the nav bar panel
        navBarPanel.add(button1);
        navBarPanel.add(button2);
        navBarPanel.add(button3);
        navBarPanel.add(button4);

        // Create the body window panel
        JPanel bodyWindowPanel = new JPanel();
        JLabel bodyLabel = new JLabel("");
        bodyWindowPanel.add(bodyLabel);

        // Set up the layout
        frame.setLayout(new BorderLayout());
        frame.add(navBarPanel, BorderLayout.WEST);
        frame.add(bodyWindowPanel, BorderLayout.CENTER);

        // Add action listeners for buttons
        button1.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                bodyLabel.setText("11");
            }
        });

        button2.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                bodyLabel.setText("22");
            }
        });

        button3.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                bodyLabel.setText("33");
            }
        });

        button4.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                bodyLabel.setText("44");
            }
        });

        frame.setVisible(true);
    }
}

