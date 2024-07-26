package staticTest2;

public class CircleTest {
    public static void main(String[] args) {
        Circle c1 = new Circle();
        Circle c2 = new Circle();
        Circle c3 = new Circle(3.4);

        System.out.println("c1's id is: " + c1.getId());
        System.out.println("c2's id is: " + c2.getId());
        System.out.println("c3's id is: " + c3.getId());

        System.out.println("total circles: " + Circle.getTotal() );
    }

}


class Circle{

    private double radius;
    private int id;     // 每创建一个新的Circle, id 自动递增

    public Circle(){
        id = init++;
        total++;
    }

    public Circle(double radius){
        this();
//        id = init++;
//        total++;

        this.radius = radius;
    }

    private static int total;       // how many circle has been created, 被所有对象共享
    private static int init = 1001; // 辅助赋值给Circle对象的id, 被所有对象共享

    public double findArea(){
        return 3.14 * radius * radius;
    }

    public int getId() {
        return id;
    }

    public static int getTotal() {
        return total;
    }

    public void setId(int id) {
        this.id = id;
    }
}