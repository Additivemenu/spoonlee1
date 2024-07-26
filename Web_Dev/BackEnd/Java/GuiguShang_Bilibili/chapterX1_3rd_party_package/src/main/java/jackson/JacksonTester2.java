package jackson;

/**
 * @author xueshuo
 * @create 2023-05-20 7:40 am
 */

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

public class JacksonTester2{
    public static void main(String[] args) {
        ArrayList<Shape> shapes = new ArrayList<>();
        shapes.add(new Rectangle());
        shapes.add(new Circle());
        shapes.add(new Line());

        ObjectMapper mapper = new ObjectMapper();

        try {
            mapper.writeValue(new File("JacksonTester2"), shapes);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Rectangle.class, name = "rectangle"),
        @JsonSubTypes.Type(value = Circle.class, name = "circle"),
        @JsonSubTypes.Type(value = Line.class, name = "line")
})
abstract class Shape {
    // common properties and methods
}

class Rectangle extends Shape {
    // properties and methods
}

class Circle extends Shape {
    // properties and methods
}

class Line extends Shape {
    // properties and methods
}

