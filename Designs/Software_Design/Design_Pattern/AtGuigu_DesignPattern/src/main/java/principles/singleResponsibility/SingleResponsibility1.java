package principles.singleResponsibility;

/**
 * 06
 * @author xueshuo
 * @create 2023-02-10 6:52 pm
 */
public class SingleResponsibility1 {
    public static void main(String[] args) {
        Vehicle vehicle = new Vehicle();
        vehicle.run("motor cycle");
        vehicle.run("car");

        vehicle.run("plane");


    }

}

// 交通工具类
// 方式一:
// 1. 在方式一的run 方法中, 违反了单一职责原则
// 2. 解决方案: 根据交通工具运行的方式不同, 将Vehicle分解为不同的类
class Vehicle{
    public void run(String vehicle){
        System.out.println(vehicle + "runs on the road");
    }

}
