package lesson3;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * @author xueshuo
 * @create 2023-03-31 4:17 pm
 */
public class TestWindow {

    public static void main(String[] args) {
        new WindowFrame();
    }
}

class WindowFrame extends Frame {

    public WindowFrame(){
        // step1 定义内容
        setVisible(true);
        setBounds(100, 100, 200, 200);
        setBackground(Color.blue);

        // step2 添加监听器
        addWindowListener(
                // 匿名内部类
                new WindowAdapter() {

                    @Override
                    public void windowClosing(WindowEvent e) {
                        System.out.println("window closing");
                        System.exit(0);
                    }

                    @Override
                    public void windowClosed(WindowEvent e) {
                        System.out.println("window closed");
                    }

                    @Override
                    public void windowActivated(WindowEvent e) {
                        WindowFrame windowFrame = (WindowFrame) e.getSource();
                        windowFrame.setTitle("activated");

                        System.out.println("window activated");
                    }

                    @Override
                    public void windowDeactivated(WindowEvent e) {
                        System.out.println("window deactivated");
                    }

                }
        );

        // step3 布局
    }


}

