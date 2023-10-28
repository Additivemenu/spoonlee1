package baeldung.vehicle;

/**
 * @author xueshuo
 * @create 2023-05-20 7:52 am
 */
public class Truck extends Vehicle {
    private double payloadCapacity;

    public Truck(String make, String model, double payloadCapacity) {
        super(make, model);
        this.payloadCapacity = payloadCapacity;
    }

    // no-arg constructor, getters and setters
}
