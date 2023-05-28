package baeldung;

import baeldung.vehicle.Car;
import baeldung.vehicle.Fleet;
import baeldung.vehicle.Truck;
import baeldung.vehicle.Vehicle;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-05-20 7:53 am
 */
public class Main {
    public static void main(String[] args) throws JsonProcessingException {
        Car car = new Car("Mercedes-Benz", "S500", 5, 250.0);
        Truck truck = new Truck("Isuzu", "NQR", 7500.0);

        List<Vehicle> vehicles = new ArrayList<>();
        vehicles.add(car);
        vehicles.add(truck);

        Fleet serializedFleet = new Fleet();
        serializedFleet.setVehicles(vehicles);

        ObjectMapper mapper = new ObjectMapper();
//        mapper.activateDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        String jsonDataString = mapper.writeValueAsString(serializedFleet);
        System.out.println(jsonDataString);
    }
}
