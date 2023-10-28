package jackson.shapes;

import com.fasterxml.jackson.annotation.JsonTypeName;

/**
 * @author xueshuo
 * @create 2023-05-19 9:08 pm
 */
@JsonTypeName("line")
public class Line extends Shape {
    private double length;

    // getters and setters
    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    @Override
    public void display() {
        System.out.println("this is a line");
    }
}
