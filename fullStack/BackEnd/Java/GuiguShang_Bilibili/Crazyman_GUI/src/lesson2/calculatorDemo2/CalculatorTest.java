package lesson2.calculatorDemo2;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * P9 改进代码: 更加的面向对象
 * @author xueshuo
 * @create 2023-03-31 11:39 am
 */
public class CalculatorTest {
    public static void main(String[] args) {
        new Calculator().loadFrame();
    }
}


// Calculator窗口
class Calculator extends Frame {
    // field
    TextField num1,num2,sum;

    // methods
    public void loadFrame(){
        // step1 定义与初始化 Frame内部的组件
        // 3个文本框
        num1 = new TextField(10);     // max 10 个字符
        num2 = new TextField(10);
        sum = new TextField(10);
        // 1 个按钮 "等号"
        Button button = new Button("=");
        // 1 个标签
        Label label = new Label("+");


        // step2 绑定监听器, 点击button 触发运算操作, 并清空num1, num2的text
        button.addActionListener(new MyCalculatorListener(this));        // 注意事件如何定义, 如何传参


        // step3 布局
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

    // 在一个类中组合另一个类, 以在本类中使用另一个类的方法和属性
    Calculator calculator;

    public MyCalculatorListener(Calculator calculator){
        this.calculator = calculator;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // 1. 获得 num1, num2
        int n1 = Integer.parseInt(calculator.num1.getText());
        int n2 = Integer.parseInt(calculator.num2.getText());

        // 2. 将num1, num2 加法运算后 的结果, 放到第三个框
        int res = n1 + n2;
        calculator.sum.setText("" + res);

        // 3. 清楚num1, num2框内的内容
        calculator.num1.setText("");
        calculator.num2.setText("");
    }
}