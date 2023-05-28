package jackson.shapes;

import com.fasterxml.jackson.annotation.JsonTypeName;

/**
 * @author xueshuo
 * @create 2023-05-19 9:08 pm
 */
@JsonTypeName("circle")
public class Circle extends Shape {
    private double radius;

    // getters and setters
    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    @Override
    public void display() {
        System.out.println("this is a circle");
    }
}
