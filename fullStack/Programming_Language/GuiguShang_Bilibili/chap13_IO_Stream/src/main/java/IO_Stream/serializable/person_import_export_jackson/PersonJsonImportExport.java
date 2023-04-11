package IO_Stream.serializable.person_import_export_jackson;

/**
 * @author xueshuo
 * @create 2023-04-02 11:24 am
 */
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;

public class PersonJsonImportExport {
    public static void main(String[] args) {
        // Create a Person object
        Person person = new Person("John Doe", 30);

        // Export the Person object to a JSON file
        String filePath = "person.json";
        exportPerson(person, filePath);

        // Import the Person object from the JSON file
        Person importedPerson = importPerson(filePath);
        System.out.println("Imported Person: " + importedPerson);
    }

    public static void exportPerson(Person person, String filePath) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(new File(filePath), person);
            System.out.println("Person object successfully written to JSON file: " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static Person importPerson(String filePath) {
        Person person = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            person = objectMapper.readValue(new File(filePath), Person.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return person;
    }

    public static class Person {
        private String name;
        private int age;

        public Person() {
        }

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }

        @Override
        public String toString() {
            return "Person{name='" + name + "', age=" + age + '}';
        }
    }
}

