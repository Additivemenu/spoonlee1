package creatatonPattern.builder.refactoring_guru.director;

/**
 * @author xueshuo
 * @create 2023-04-23 9:59 pm
 */


import creatatonPattern.builder.refactoring_guru.Builder;
import creatatonPattern.builder.refactoring_guru.cars.CarType;
import creatatonPattern.builder.refactoring_guru.components.Engine;
import creatatonPattern.builder.refactoring_guru.components.GPSNavigator;
import creatatonPattern.builder.refactoring_guru.components.Transmission;
import creatatonPattern.builder.refactoring_guru.components.TripComputer;

/**
 * Director defines the order of building steps. It works with a builder object
 * through common Builder interface. Therefore it may not know what product is
 * being built.
 */
public class Director {

    public void constructSportsCar(Builder builder) {
        builder.setCarType(CarType.SPORTS_CAR);
        builder.setSeats(2);
        builder.setEngine(new Engine(3.0, 0));
        builder.setTransmission(Transmission.SEMI_AUTOMATIC);
        builder.setTripComputer(new TripComputer());
        builder.setGPSNavigator(new GPSNavigator());
    }

    public void constructCityCar(Builder builder) {
        builder.setCarType(CarType.CITY_CAR);
        builder.setSeats(2);
        builder.setEngine(new Engine(1.2, 0));
        builder.setTransmission(Transmission.AUTOMATIC);
        builder.setTripComputer(new TripComputer());
        builder.setGPSNavigator(new GPSNavigator());
    }

    public void constructSUV(Builder builder) {
        builder.setCarType(CarType.SUV);
        builder.setSeats(4);
        builder.setEngine(new Engine(2.5, 0));
        builder.setTransmission(Transmission.MANUAL);
        builder.setGPSNavigator(new GPSNavigator());
    }
}
