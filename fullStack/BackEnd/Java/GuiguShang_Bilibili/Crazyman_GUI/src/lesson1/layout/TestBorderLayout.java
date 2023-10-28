package lesson1.layout;

import java.awt.*;

/**
 * P5
 * @author xueshuo
 * @create 2023-03-31 9:48 am
 */
public class TestBorderLayout {

    public static void main(String[] args) {
        Frame frame = new Frame("TestBorderLayout");

        Button east = new Button("East");
        Button west = new Button("West");
        Button south = new Button("South");
        Button north = new Button("North");
        Button center = new Button("Center");

        frame.add(east, BorderLayout.EAST);
        frame.add(west, BorderLayout.WEST);
        frame.add(south, BorderLayout.SOUTH);
        //frame.add(north, BorderLayout.NORTH);
        frame.add(center, BorderLayout.CENTER);

        frame.setSize(500, 500);
        frame.setVisible(true);
    }
}
