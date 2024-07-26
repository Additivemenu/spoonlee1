package jackson;

import jackson.shapes.Circle;
import jackson.shapes.Rectangle;
import jackson.shapes.Shape;
import jackson.text.Text;
import org.junit.Test;

import java.io.*;
import java.util.ArrayList;

/**
 * @author xueshuo
 * @create 2023-05-20 6:52 am
 */
public class JavaSerializationTest implements Serializable{
    @Test
    public void exportTest(){
        ArrayList<Text> textList = new ArrayList<>();
        ArrayList<Shape> shapeList = new ArrayList<>();
        textList.add(new Text("abc", 12));
        textList.add(new Text("bcd", 10));

        Circle circle = new Circle();
        circle.setRadius(10);
        circle.setColor("red");
        Rectangle rectangle = new Rectangle();
        rectangle.setHeight(20);
        rectangle.setWidth(15);
        rectangle.setColor("blue");
        shapeList.add(circle);
        shapeList.add(rectangle);

        Wrapper wrapper = new Wrapper(textList,shapeList);

        try {
            FileOutputStream file = new FileOutputStream("list.ser");
            ObjectOutputStream out = new ObjectOutputStream(file);

            out.writeObject(wrapper);

            out.close();
            file.close();

            System.out.println("ArrayLists have been serialized");


        } catch (IOException ex) {
            System.out.println("IOException is caught");
            ex.printStackTrace();
        }


    }

    @Test
    public void loadTest(){
        // Deserialization
        try {
            FileInputStream file = new FileInputStream("list.ser");
            ObjectInputStream in = new ObjectInputStream(file);

            Wrapper wrapper = (Wrapper) in.readObject();

            ArrayList<Text> textList = wrapper.getTextList();
            ArrayList<Shape> shapeList = wrapper.getShapeList();

            in.close();
            file.close();

            System.out.println("ArrayLists have been deserialized");

            // Now you can use textList and shapeList...
            for(Text text:textList){
                System.out.println(text.toString());
            }

            for(Shape shape:shapeList){
                shape.display();
            }


        } catch (IOException ex) {
            System.out.println("IOException is caught");
            ex.printStackTrace();
        } catch (ClassNotFoundException ex) {
            System.out.println("ClassNotFoundException is caught");
            ex.printStackTrace();
        }
    }

    class Wrapper implements Serializable{
        private ArrayList<Text> textList;
        private ArrayList<Shape> shapeList;

        public Wrapper(ArrayList<Text> textList, ArrayList<Shape> shapeList) {
            this.textList = textList;
            this.shapeList = shapeList;
        }

        public ArrayList<Text> getTextList() {
            return textList;
        }

        public ArrayList<Shape> getShapeList() {
            return shapeList;
        }
    }

}
