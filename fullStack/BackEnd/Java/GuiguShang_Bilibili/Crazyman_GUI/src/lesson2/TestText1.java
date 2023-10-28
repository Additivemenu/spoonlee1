package lesson2;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * P8
 *
 * @author xueshuo
 * @create 2023-03-31 11:11 am
 */
public class TestText1 {
    public static void main(String[] args) {
        new MyFrame();
    }

}


class MyFrame extends Frame {
    public MyFrame(){
        TextField textField = new TextField();
        add(textField);

        // 监听 textField输入的文字
        // 按下enter键, 就会触发这个输入框的被绑定的ActionListener中定义的事件(ActionPerformed)
        textField.addActionListener(new MyActionListener2());

        // 设置替换编码
        textField.setEchoChar('*');     // 前端输入框输入的文字会被替换为'*'

        pack();
        setVisible(true);

    }
}


class MyActionListener2 implements ActionListener{

    // 定义事件:
    @Override
    public void actionPerformed(ActionEvent e) {

        TextField field = (TextField) e.getSource();      // 获得一些资源，返回对象
        System.out.println(field.getText());    // 获得输入框中的文本
        field.setText("");      // 清空文本框
    }
}