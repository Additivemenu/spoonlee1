package principles.openClosed;

/**
 * @author xueshuo
 * @create 2023-02-11 11:06 am
 */
public class OpenClosed {

    public static void main(String[] args) {
        // 看看问题
        GraphicEditor graphicEditor = new GraphicEditor();
        graphicEditor.drawRectangle(new Rectangle());
        graphicEditor.drawCircle(new Circle());

    }
}

class GraphicEditor {
    // 接收Shape对象, 根据Shape对象的type属性绘制不同的图形
    public void drawShape(Shape s) {
        if (s.m_type == 1)
            drawRectangle(s);
        else if (s.m_type == 2)
            drawCircle(s);
    }

    public void drawRectangle(Shape r) {
        System.out.println("draw rectangle");
    }

    public void drawCircle(Shape r) {
        System.out.println("draw circle");
    }
}
// 基类
class Shape {
    int m_type;
}

class Rectangle extends Shape {
    Rectangle() {
        super.m_type = 1;
    }
}

class Circle extends Shape {
    Circle() {
        super.m_type = 2;
    }
}