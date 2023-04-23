package creatatonPattern.builder.refactoring_guru;

/**
 * @author xueshuo
 * @create 2023-04-23 9:53 pm
 */


import creatatonPattern.builder.refactoring_guru.cars.CarType;
import creatatonPattern.builder.refactoring_guru.components.Engine;
import creatatonPattern.builder.refactoring_guru.components.GPSNavigator;
import creatatonPattern.builder.refactoring_guru.components.Transmission;
import creatatonPattern.builder.refactoring_guru.components.TripComputer;

/**
 * Builder interface defines all possible ways to configure a product.
 */
public interface Builder {
    void setCarType(CarType type);
    void setSeats(int seats);
    void setEngine(Engine engine);
    void setTransmission(Transmission transmission);
    void setTripComputer(TripComputer tripComputer);
    void setGPSNavigator(GPSNavigator gpsNavigator);
}
