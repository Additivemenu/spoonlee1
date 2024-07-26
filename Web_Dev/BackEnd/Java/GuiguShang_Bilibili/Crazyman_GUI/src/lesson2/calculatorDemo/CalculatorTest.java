package lesson2.calculatorDemo;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * 初始写法, 有点面向过程
 *
 * @author xueshuo
 * @create 2023-03-31 11:39 am
 */
public class CalculatorTest {
    public static void main(String[] args) {
        new Calculator();
    }
}


// Calculator窗口
class Calculator extends Frame {

    public Calculator(){

        // 3个文本框
        TextField num1 = new TextField(10);     // max 10 个字符
        TextField num2 = new TextField(10);
        TextField sum = new TextField(10);

        // 1 个按钮 "等号"
        Button button = new Button("=");
        button.addActionListener(new MyCalculatorListener(num1, num2, sum));        // 注意事件如何定义, 如何传参

        // 1 个标签
        Label label = new Label("+");

        setLayout(new FlowLayout());

        add(num1);
        add(label);
        add(num2);
        add(button);
        add(sum);

        pack();
        setVisible(true);
    }

}


// 监听器类
class MyCalculatorListener implements ActionListener{


    // 获取3个变量
    private TextField num1, num2, sum;

    public MyCalculatorListener(TextField num1, TextField num2, TextField sum){
        this.num1 = num1;
        this.num2 = num2;
        this.sum = sum;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // 1. 获得 num1, num2
        int n1 = Integer.parseInt(num1.getText());
        int n2 = Integer.parseInt(num2.getText());

        // 2. 将num1, num2 加法运算后 的结果, 放到第三个框
        int res = n1 + n2;
        sum.setText("" + res);

        // 3. 清楚num1, num2框内的内容
        num1.setText("");
        num2.setText("");
    }
}