package jackson;

/**
 * @author xueshuo
 * @create 2023-05-19 9:04 pm
 */

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jackson.shapes.Circle;
import jackson.shapes.Line;
import jackson.shapes.Rectangle;
import jackson.shapes.Shape;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class test1 {

    /**
     * need a wrapper class with non-argument constructor
     * @throws IOException
     */
    @Test
    public void testExport( ) throws IOException {
        // Create an ArrayList of Shape objects
        List<Shape> shapes = new ArrayList<>();

        // Create and add a Rectangle
        Rectangle rectangle = new Rectangle();
//        Sahpe rectangle = new Rectangle();
        rectangle.setColor("red");
        rectangle.setWidth(5.0);
        rectangle.setHeight(10.0);
        shapes.add(rectangle);

        // Create and add a Circle
        Circle circle = new Circle();
        circle.setColor("blue");
        circle.setRadius(3.0);
        shapes.add(circle);

        // Create and add a Line
        Line line = new Line();
        line.setColor("green");
        line.setLength(7.0);
        shapes.add(line);

        Wrapper wrapper =new Wrapper((ArrayList<Shape>) shapes);

        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.enableDefaultTyping(ObjectMapper.DefaultTyping.JAVA_LANG_OBJECT);
//        objectMapper.enableDefaultTyping();
//        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);  // Pretty print

        try {
            new ObjectMapper()
//                .writerWithDefaultPrettyPrinter()
                    .writeValue(new File("shapes0.json"), line);

            // Write the list of shapes to a JSON file
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File("shapes1.json"), wrapper);
            System.out.println(objectMapper.writeValueAsString(shapes));
            System.out.println("JSON file created successfully!");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testRead(){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
//            Wrapper wrapper = objectMapper.readValue(new File("shapes1.json"), new TypeReference<Wrapper>() {});
            Wrapper wrapper = objectMapper.readValue(new File("shapes1.json"), Wrapper.class);
            System.out.println("List of Shapes loaded successfully!");
            ArrayList<Shape> shapes = wrapper.getShapeList();

            // Print the shapes
            for (Shape shape : shapes) {
                System.out.println(shape.getClass().getSimpleName());
                shape.display();        // maintain polymorphism behaviour
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test3(){
        // Create an ArrayList of Shape objects
        List<Shape> shapes = new ArrayList<>();

        // Create and add a Rectangle
        Rectangle rectangle = new Rectangle();
        rectangle.setColor("red");
        rectangle.setWidth(5.0);
        rectangle.setHeight(10.0);
        shapes.add(rectangle);

        // Create and add a Circle
        Circle circle = new Circle();
        circle.setColor("blue");
        circle.setRadius(3.0);
        shapes.add(circle);

        // Create and add a Line
        Line line = new Line();
        line.setColor("green");
        line.setLength(7.0);
        shapes.add(line);

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Write the list of shapes to a JSON file
            objectMapper.writeValue(new File("shapes.json"), shapes);
            System.out.println("JSON file created successfully!");

            // Now, read the JSON file back into a List<Shape>
            List<Shape> loadedShapes = objectMapper.readValue(new File("shapes.json"), new TypeReference<List<Shape>>() {});
            System.out.println("List of Shapes loaded successfully!");

            // Print the loaded shapes
            for (Shape shape : loadedShapes) {
                System.out.println(shape.getClass().getSimpleName());
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    class Wrapper{
//        private ArrayList<Shape> shapeList;
//
//        public Wrapper(ArrayList<Shape> shapeList) {
//            this.shapeList = shapeList;
//        }
//
//        public ArrayList<Shape> getShapeList() {
//            return shapeList;
//        }
//    }
}
