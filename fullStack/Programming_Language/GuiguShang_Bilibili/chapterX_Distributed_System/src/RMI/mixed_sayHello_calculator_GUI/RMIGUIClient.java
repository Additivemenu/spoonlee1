package RMI.mixed_sayHello_calculator_GUI;

/**
 * @author xueshuo
 * @create 2023-04-24 8:02 pm
 */

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class RMIGUIClient {
    private static HelloWorld helloWorld;
    private static Calculator calculator;

    public static void main(String[] args) {
        try {
            Registry registry = LocateRegistry.getRegistry("localhost", 1099);
            helloWorld = (HelloWorld) registry.lookup("HelloWorld");
            calculator = (Calculator) registry.lookup("Calculator");

            createMainFrame();

        } catch (Exception e) {
            System.err.println("Client exception: " + e.toString());
            e.printStackTrace();
        }
    }

    private static void createMainFrame() {
        JFrame mainFrame = new JFrame("RMI Client");
        mainFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        mainFrame.setSize(800, 600);

        JDesktopPane desktopPane = new JDesktopPane();
        mainFrame.setContentPane(desktopPane);

        JInternalFrame helloWorldFrame = createHelloWorldFrame();
        desktopPane.add(helloWorldFrame);

        JInternalFrame calculatorFrame = createCalculatorFrame();
        desktopPane.add(calculatorFrame);

        mainFrame.setVisible(true);
    }

    private static JInternalFrame createHelloWorldFrame() {
        JInternalFrame helloWorldFrame = new JInternalFrame("Hello World", true, true, true, true);
        helloWorldFrame.setSize(300, 150);
        helloWorldFrame.setVisible(true);

        JButton helloWorldButton = new JButton("Say Hello");
        helloWorldButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    JOptionPane.showMessageDialog(null, helloWorld.sayHello());
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });

        helloWorldFrame.getContentPane().add(helloWorldButton, BorderLayout.CENTER);
        return helloWorldFrame;
    }

    private static JInternalFrame createCalculatorFrame() {
        JInternalFrame calculatorFrame = new JInternalFrame("Calculator", true, true, true, true);
        calculatorFrame.setSize(400, 300);
        calculatorFrame.setLayout(new GridLayout(6, 2));
        calculatorFrame.setVisible(true);

        // ... (rest of the calculator GUI code, same as before)
        JLabel num1Label = new JLabel("Number 1:");
        JTextField num1Field = new JTextField();
        JLabel num2Label = new JLabel("Number 2:");
        JTextField num2Field = new JTextField();
        JLabel resultLabel = new JLabel("Result:");
        JTextField resultField = new JTextField();

        resultField.setEditable(false);

        JButton addButton = new JButton("Add");
        addButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    double num1 = Double.parseDouble(num1Field.getText());
                    double num2 = Double.parseDouble(num2Field.getText());
                    double result = calculator.add(num1, num2);
                    resultField.setText(Double.toString(result));
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });

        JButton subtractButton = new JButton("Subtract");
        subtractButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    double num1 = Double.parseDouble(num1Field.getText());
                    double num2 = Double.parseDouble(num2Field.getText());
                    double result = calculator.subtract(num1, num2);
                    resultField.setText(Double.toString(result));
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });

        JButton multiplyButton = new JButton("Multiply");
        multiplyButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    double num1 = Double.parseDouble(num1Field.getText());
                    double num2 = Double.parseDouble(num2Field.getText());
                    double result = calculator.multiply(num1, num2);
                    resultField.setText(Double.toString(result));
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });

        JButton divideButton = new JButton("Divide");
        divideButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    double num1 = Double.parseDouble(num1Field.getText());
                    double num2 = Double.parseDouble(num2Field.getText());
                    double result = calculator.divide(num1, num2);
                    resultField.setText(Double.toString(result));
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });

        calculatorFrame.add(num1Label);
        calculatorFrame.add(num1Field);
        calculatorFrame.add(num2Label);
        calculatorFrame.add(num2Field);
        calculatorFrame.add(resultLabel);
        calculatorFrame.add(resultField);
        calculatorFrame.add(addButton);
        calculatorFrame.add(subtractButton);
        calculatorFrame.add(multiplyButton);
        calculatorFrame.add(divideButton);



        return calculatorFrame;
    }
}

