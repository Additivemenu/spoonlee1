package lesson3;

import java.awt.*;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

/**
 * P13 键盘监听
 *
 * @author xueshuo
 * @create 2023-03-31 8:36 pm
 */
public class TestKeyListener {

    public static void main(String[] args) {
        new KeyFrame();
    }
}

class KeyFrame extends Frame {
    public KeyFrame(){
        setBounds(100, 200, 300, 400);
        setVisible(true);

        this.addKeyListener(new KeyAdapter() {
            // 键盘按下, 触发事件:
            @Override
            public void keyPressed(KeyEvent e) {

                int keyCode = e.getKeyCode();  // 得到键盘按下的键是哪一个键的key code.  不需要记忆数值， 直接用静态属性 VK_XXX

                System.out.println(keyCode);

                if(keyCode == KeyEvent.VK_UP){
                    System.out.println("you just pressed up");
                }
            }
        });
    }

}
