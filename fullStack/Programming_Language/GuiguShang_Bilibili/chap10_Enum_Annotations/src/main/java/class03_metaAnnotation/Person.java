package class03_metaAnnotation;

import class02_customizingAnnotation.MyAnnotation;

/**
 * @author xueshuo
 * @create 2023-02-21 9:23 am
 */
@MyAnnotation(value = "hello world!")
public class Person{
    private String name;
    private int age;

    public Person() {
    }


    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void walk(){
        System.out.println("walk");
    }

    public void eat(){
        System.out.println("eat");
    }
}
