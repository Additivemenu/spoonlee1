package Annotation;

/**
 *  the use of Annotation:
 *  1. for docs
 *  2. format checking when compiling
 *  3. track dependency, auto-configuration
 *
 *  customize Annotation: see @SuppressWarnings
 *
 * @author xueshuo
 * @create 2023-01-01 17:22
 */
public class AnnotationTest {

    public static void main(String[] args) {

    }


}

@MyAnnotation(value = "hi")
class Person{
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

interface Info{
    void show();
}

class Student extends Person implements Info{

    @Override
    public void walk(){
        System.out.println("student walks");
    }

    public void show(){

    }
}
