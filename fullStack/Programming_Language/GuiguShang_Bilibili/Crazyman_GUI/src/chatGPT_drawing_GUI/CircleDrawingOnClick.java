package chatGPT_drawing_GUI;

/**
 * @author xueshuo
 * @create 2023-04-24 8:23 pm
 */

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

public class CircleDrawingOnClick {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Circle Drawing on Click");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(600, 600);

        CirclePanel circlePanel = new CirclePanel();
        frame.add(circlePanel);
        frame.setVisible(true);
    }

    static class Circle {
        int x, y, radius;

        public Circle(int x, int y, int radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
        }
    }

    static class CirclePanel extends JPanel {
        private final ArrayList<Circle> circles;
        private final int circleRadius = 30;

        public CirclePanel() {
            circles = new ArrayList<>();
            addMouseListener(new MouseAdapter() {
                @Override
                public void mouseClicked(MouseEvent e) {
                    circles.add(new Circle(e.getX(), e.getY(), circleRadius));
                    repaint();
                }
            });
        }

        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            for (Circle circle : circles) {
                drawCircle(g, circle.x, circle.y, circle.radius);
            }
        }

        private void drawCircle(Graphics g, int x, int y, int radius) {
            g.setColor(Color.BLUE);
            g.fillOval(x - radius, y - radius, 2 * radius, 2 * radius);
        }
    }
}




