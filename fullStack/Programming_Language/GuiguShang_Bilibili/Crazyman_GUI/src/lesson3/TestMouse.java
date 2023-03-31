package lesson3;

import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.Iterator;

/**
 * P11 测试鼠标监听事件
 * @author xueshuo
 * @create 2023-03-31 3:42 pm
 */
public class TestMouse {

    public static void main(String[] args) {
        new MyFrame("paint");
    }

}

class MyFrame extends Frame {
    // 画画需要画笔, 需要监听鼠标当前位置, 需要集合来存储这些点
    ArrayList points;

    public MyFrame(String title){
        // step1 初始化 Frame内的成员与组件
        super(title);
        setBounds(200, 200, 400, 300);
        points = new ArrayList();  // 存鼠标点击产生的点
        setVisible(true);

        // step2  绑定监听器
        // 鼠标监听器, 正对这个窗口
        this.addMouseListener(new MyMouseListener());

        // step3 布局

    }

    @Override
    public void paint(Graphics g) {
        // 画画, 监听鼠标的事件
        Iterator iterator = points.iterator();

        while(iterator.hasNext()){
            Point point = (Point) iterator.next();
            g.setColor(Color.blue);
            g.fillOval(point.x, point.y, 10, 10);
        }
    }

    // 添加一个点到界面上
    public void addPoint(Point point){
        points.add(point);
    }

    // 适配器模式
    private class MyMouseListener extends MouseAdapter {
        // 鼠标 按下, 弹起, 按住不放

        // 点击mouse后, 触发的事件:
        @Override
        public void mousePressed(MouseEvent e) {
            MyFrame myFrame = (MyFrame) e.getSource();      // return object on which event initially occurred

            // 这里我们点击时, 在界面上就会产生一个点
            myFrame.addPoint(new Point(e.getX(), e.getY()));    // 监听, 得到鼠标点击时, 在屏幕中的位置, 并得到的位置信息转化为一个Point 对象, 加入ArrayList

            myFrame.repaint();     // 每次点击鼠标, 需要重新渲染一遍
        }
    }

}
