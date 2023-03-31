package lesson2.calculatorDemo3;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * P9 继续改进代码: 采用内部类
 * @author xueshuo
 * @create 2023-03-31 11:39 am
 */
public class CalculatorTest {
    public static void main(String[] args) {
        new Calculator().loadFrame();
    }
}


// Calculator窗口组件
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
        button.addActionListener(new MyCalculatorListener());        // 注意事件如何定义, 如何传参


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


    // 内部类的最大好处， 就是可以畅通无阻去获取外部类的属性和方法
    // 直接去获取Calculator内部结构
    private class MyCalculatorListener implements ActionListener{

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

}


