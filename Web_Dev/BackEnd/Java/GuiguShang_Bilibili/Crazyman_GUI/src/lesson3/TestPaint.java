package lesson3;

import java.awt.*;

/**
 * @author xueshuo
 * @create 2023-03-31 1:02 pm
 */
public class TestPaint {
    public static void main(String[] args) {
        new MyPaint().loadFrame();
    }
}


class MyPaint extends Frame {

    public void loadFrame(){

        setBounds(200, 200, 800, 600);
        setVisible(true);

    }

    // 画笔
    @Override
    public void paint(Graphics g) {

        // 画笔需要颜色， 可以画画
        g.setColor(Color.red);
        g.drawOval(100,100, 100, 100);      // hollow
        g.fillOval(200,200, 100, 100);      // solid

        g.setColor(Color.green);
        g.fillRect(300,300, 100, 100);

        // 养成习惯: 画笔用完, 将它还原到最初的颜色
        g.setColor(Color.black);
    }


}
