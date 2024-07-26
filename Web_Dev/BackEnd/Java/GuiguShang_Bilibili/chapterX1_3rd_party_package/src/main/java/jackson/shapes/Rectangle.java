package jackson.shapes;

import com.fasterxml.jackson.annotation.JsonTypeName;

/**
 * @author xueshuo
 * @create 2023-05-19 9:08 pm
 */
@JsonTypeName("rectangle")
public class Rectangle extends Shape {
    private double width;
    private double height;

    // getters and setters
    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    @Override
    public void display() {
        System.out.println("this is a rectangle");
    }
}
