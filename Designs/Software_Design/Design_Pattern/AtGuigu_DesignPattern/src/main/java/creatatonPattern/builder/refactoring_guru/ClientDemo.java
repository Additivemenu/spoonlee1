package creatatonPattern.builder.refactoring_guru;

/**
 * @author xueshuo
 * @create 2023-04-23 10:00 pm
 */


import creatatonPattern.builder.refactoring_guru.cars.Car;
import creatatonPattern.builder.refactoring_guru.cars.Manual;
import creatatonPattern.builder.refactoring_guru.director.Director;

/**
 * Demo class. Everything comes together here.
 */
public class ClientDemo {

    public static void main(String[] args) {
        Director director = new Director();

        // Director gets the concrete builder object from the client
        // (application code). That's because application knows better which
        // builder to use to get a specific product.
        CarBuilder builder = new CarBuilder();
        director.constructSportsCar(builder);       // constructing each component of a sports car
        // The final product is often retrieved from a builder object, since
        // Director is not aware and not dependent on concrete builders and
        // products.
        Car car = builder.getResult();      // assemble components together
        System.out.println("Car built:\n" + car.getCarType());


        CarManualBuilder manualBuilder = new CarManualBuilder();
        // Director may know several building recipes.
        director.constructSportsCar(manualBuilder);
        Manual carManual = manualBuilder.getResult();
        System.out.println("\nCar manual built:\n" + carManual.print());
    }

}
