package CollectionInterface;

import java.util.Objects;

/**
 * @author xueshuo
 * @create 2023-01-04 4:43 pm
 */
public class Person implements Comparable{
    private String name;
    private int age;

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

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Person() {
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    // 按照姓名从小到大排序, 年龄从小到大排序
    @Override
    public int compareTo(Object o) {
        if(o instanceof Person){
            Person person = (Person) o;
            int compare =  this.name.compareTo(person.getName());
            if(compare != 0) {
                return compare;
            }else{
                return Integer.compare(this.age, person.age);
            }

        }else{
            throw new RuntimeException("input type not matched");
        }
    }

    @Override
    public boolean equals(Object o) {
        //System.out.println("equals()");
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
