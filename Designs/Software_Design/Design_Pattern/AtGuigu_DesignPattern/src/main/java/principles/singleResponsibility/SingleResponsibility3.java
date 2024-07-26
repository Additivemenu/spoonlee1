package principles.singleResponsibility;

/**
 * @author xueshuo
 * @create 2023-02-10 7:04 pm
 */
public class SingleResponsibility3 {
    public static void main(String[] args) {
        Vehicle2 vehicle2 = new Vehicle2();
        vehicle2.run("car");
        vehicle2.runAir("plane");
        vehicle2.runWater("ship");
    }
}


/**
 * 方式三的分析:
 * 1. 这种修改方法没有对原来的类做大的修改, 只是增加了方法
 * 2. 这里虽然没有在类的级别上遵守单一职责原则, 但是在方法级别上, 仍然是遵守了单一职责原则
 */

class Vehicle2{
    public void run(String vehicle){
        System.out.println(vehicle + "runs on the road");
    }

    public void runAir(String vehicle){
        System.out.println(vehicle + "runs in the air");
    }

    public void runWater(String vehicle){
        System.out.println(vehicle + "runs on the water");
    }

}