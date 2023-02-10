package principles.singleResponsibility;

/**
 * @author xueshuo
 * @create 2023-02-10 6:59 pm
 */
public class SingleResponsibility2 {

    public static void main(String[] args) {
        RoadVehicle roadVehicle = new RoadVehicle();
        roadVehicle.run("motor cycle");
        roadVehicle.run("car");

        AirVehicle airVehicle = new AirVehicle();
        airVehicle.run("plane");
    }
}

/**
 * 分析:
 * 方案二遵守了单一职责原则
 * 但是这样做的改动很大, 即需要将类分解, 同时修改客户端
 * 改进: 直接修改Vehicle类, 改动的代码比较少
 *
 */

class RoadVehicle{
    public void run(String vehicle){
        System.out.println(vehicle + " runs on the road");
    }
}


class AirVehicle{
    public void run(String vehicle){
        System.out.println(vehicle + " flies in the air");
    }
}

class WaterVehicle{
    public void run(String vehicle){
        System.out.println(vehicle + " runs on the water");
    }
}