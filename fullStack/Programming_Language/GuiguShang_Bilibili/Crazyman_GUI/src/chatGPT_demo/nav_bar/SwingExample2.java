package chatGPT_demo.nav_bar;

/**
 * @author xueshuo
 * @create 2023-04-01 12:40 pm
 */
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SwingExample2 {

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

        // Create the body window panel with CardLayout
        JPanel bodyWindowPanel = new JPanel(new CardLayout());
        JPanel functionality1 = new JPanel();
        JPanel functionality2 = new JPanel();
        JPanel functionality3 = new JPanel();
        JPanel functionality4 = new JPanel();

        // Add components to the functionality panels
        functionality1.add(new JLabel("Functionality 1"));
        functionality2.add(new JLabel("Functionality 2"));
        functionality3.add(new JLabel("Functionality 3"));
        functionality4.add(new JLabel("Functionality 4"));

        // Add functionality panels to the body window panel
        bodyWindowPanel.add(functionality1, "1");
        bodyWindowPanel.add(functionality2, "2");
        bodyWindowPanel.add(functionality3, "3");
        bodyWindowPanel.add(functionality4, "4");

        // Set up the layout
        frame.setLayout(new BorderLayout());
        frame.add(navBarPanel, BorderLayout.WEST);
        frame.add(bodyWindowPanel, BorderLayout.CENTER);

        // Add action listeners for buttons
        ActionListener buttonActionListener = new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                CardLayout cardLayout = (CardLayout) bodyWindowPanel.getLayout();
                cardLayout.show(bodyWindowPanel, e.getActionCommand());
            }
        };

        button1.setActionCommand("1");
        button1.addActionListener(buttonActionListener);
        button2.setActionCommand("2");
        button2.addActionListener(buttonActionListener);
        button3.setActionCommand("3");
        button3.addActionListener(buttonActionListener);
        button4.setActionCommand("4");
        button4.addActionListener(buttonActionListener);

        frame.setVisible(true);
    }
}

