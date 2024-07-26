package jackson;

import jackson.shapes.Shape;

import java.util.ArrayList;

/**
 * @author xueshuo
 * @create 2023-05-20 8:07 am
 */
public class Wrapper{
    private ArrayList<jackson.shapes.Shape> shapeList;

    public Wrapper() {
    }

    public Wrapper(ArrayList<jackson.shapes.Shape> shapeList) {
        this.shapeList = shapeList;
    }

    public ArrayList<Shape> getShapeList() {
        return shapeList;
    }
}
