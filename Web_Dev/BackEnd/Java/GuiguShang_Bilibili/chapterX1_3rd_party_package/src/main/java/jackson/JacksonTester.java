package jackson;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

/**
 * @author xueshuo
 * @create 2023-05-19 10:31 pm
 */
public class JacksonTester {
    public static void main(String args[]) throws IOException {
        Shape shape = new JacksonTester.Circle("CustomCircle", 1);

        String result = new ObjectMapper()
                .writerWithDefaultPrettyPrinter()
                .writeValueAsString(shape);
        new ObjectMapper()
//                .writerWithDefaultPrettyPrinter()
                .writeValue(new File("jacksonTester1.json"), shape);
        System.out.println(result);
        System.out.println("------------------");

        String json = "{\"name\":\"CustomCircle\",\"radius\":1.0, \"type\":\"circle\"}";
        Circle circle = new ObjectMapper().readerFor(Shape.class).readValue(json);
        System.out.println(circle.name);
    }

    @Test
    public void test1() throws IOException {
        // export a single object------------------
        JacksonTester.Circle shape = new JacksonTester.Circle("CustomCircle", 1);
        new ObjectMapper()
                .writerWithDefaultPrettyPrinter()
                .writeValue(new File("jacksonTester1.json"), shape);

        // export list------------------------------
        ArrayList<Shape> shapeList = new ArrayList();
        shapeList.add(shape);
        shapeList.add(new JacksonTester.Square("aSquare", 20.0));

        Wrapper wrapper = new Wrapper(shapeList);

        new ObjectMapper()
                .writerWithDefaultPrettyPrinter()
                .writeValue(new File("jacksonTester2.json"), wrapper);

        // test read
        String json = "{\"name\":\"CustomCircle\",\"radius\":1.0, \"type\":\"circle\"}";
        Circle circle = new ObjectMapper().readerFor(Shape.class).readValue(json);
        System.out.println(circle.name);
    }


    // ==================================================
    @JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
            include = JsonTypeInfo.As.PROPERTY, property = "type")
    @JsonSubTypes({
            @JsonSubTypes.Type(value = Square.class, name = "square"),
            @JsonSubTypes.Type(value = Circle.class, name = "circle")
    })
    static class Shape {
        public String name;
        Shape(String name) {
            this.name = name;
        }
    }

//    @JsonTypeName("square")
    static class Square extends Shape {
        public double length;
        Square(){
            this(null,0.0);
        }
        Square(String name, double length){
            super(name);
            this.length = length;
        }
    }
//    @JsonTypeName("circle")
    static class Circle extends Shape {
        public double radius;
        Circle(){
            this(null,0.0);
        }
        Circle(String name, double radius){
            super(name);
            this.radius = radius;
        }
    }

    class Wrapper {
        private ArrayList<Shape> shapeList;

        public Wrapper(ArrayList<Shape> shapeList) {
            this.shapeList = shapeList;
        }

        public ArrayList<Shape> getShapeList() {
            return shapeList;
        }
    }
}
