package melb.li;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author xueshuo
 * @create 2023-01-06 8:47 pm
 */
public class main {
    public static void main(String[] args) {
        List<Integer> integerList = List.of(0,1,2,3,4,5,6);

        // return true if element is true
        List<Boolean> result =  integerList
                .stream()
                .map(number -> number%2 == 0)
                .collect(Collectors.toList());
        System.out.println(result);

        // return only even number
        List<Integer> onlyEven = integerList
                .stream()
                .filter(ele -> ele%2==0)
                .collect(Collectors.toList());
        System.out.println(onlyEven);

        // determine if list only contains even numbers
        boolean result2 = integerList.stream().allMatch(ele -> ele%2==0);
        System.out.println(result2);        // false

        boolean result3 = onlyEven.stream().allMatch(ele -> ele%2==0);
        System.out.println(result3);        // true

        // determine if list contains at least 1 even number
        boolean atLeastOneEven = integerList.stream().anyMatch(ele -> ele%2==0);
        System.out.println(atLeastOneEven); // true

        // ----------------------------------------------------------
        List<Person> persons = new ArrayList<Person>();
        persons.add(new Person("1", 5));
        persons.add(new Person("2", 6));
        persons.add(new Person("3", 7));

        List<Person> persons2 = persons.stream().map(person -> new Person("3", person.getAge())).collect(Collectors.toList());
        System.out.println(persons2);
        System.out.println(persons);        // persons不变, stream API的特点

    }

//    // TODO: 为什么得是static的?
//    static class Person{
//        private String name;
//        private int age;
//
//        public Person(String name, int age) {
//            this.name = name;
//            this.age = age;
//        }
//
//        public String getName() {
//            return name;
//        }
//
//        public void setName(String name) {
//            this.name = name;
//        }
//
//        public int getAge() {
//            return age;
//        }
//
//        public void setAge(int age) {
//            this.age = age;
//        }
//
//        @Override
//        public String toString() {
//            return "Person{" +
//                    "name='" + name + '\'' +
//                    ", age=" + age +
//                    '}';
//        }
//    }


}
