package baeldung.vehicle;

/**
 * @author xueshuo
 * @create 2023-05-20 7:52 am
 */
public class Car extends Vehicle {
    private int seatingCapacity;
    private double topSpeed;

    public Car(String make, String model, int seatingCapacity, double topSpeed) {
        super(make, model);
        this.seatingCapacity = seatingCapacity;
        this.topSpeed = topSpeed;
    }

    // no-arg constructor, getters and setters
}
