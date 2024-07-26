package principles.openClosed.improvement;

/**
 * @author xueshuo
 * @create 2023-02-11 11:06 am
 */
public class OpenClosed {

    public static void main(String[] args) {

        GraphicEditor graphicEditor = new GraphicEditor();
        graphicEditor.drawShape(new Rectangle());
        graphicEditor.drawShape(new Circle());
        graphicEditor.drawShape(new Triangle());
    }
}

// 使用方, 不要修改代码, 只要提供方扩展即可
class GraphicEditor {
    public void drawShape(Shape s){
        s.draw();
    }
}

// 基类
abstract class Shape {
    public abstract void draw();
}

class Rectangle extends Shape {
    @Override
    public void draw() {
        System.out.println("draw Rectangle");
    }
}

class Circle extends Shape {

    @Override
    public void draw() {
        System.out.println("draw circle");
    }
}

class Triangle extends Shape{

    @Override
    public void draw() {
        System.out.println("draw triangle");
    }
}