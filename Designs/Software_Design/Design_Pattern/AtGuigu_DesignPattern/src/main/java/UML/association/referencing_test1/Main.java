package UML.association.referencing_test1;

/**
 * @author xueshuo
 * @create 2023-04-04 7:40 am
 */
public class Main {
    public static void main(String[] args) {
        ClassC classC = new ClassC();
        ClassA a = new ClassA(classC);
        ClassB b = new ClassB(classC);

        a.getClassC().setNum(10);
        System.out.println(classC.getNum());

        b.getClassC().setNum(20);
        System.out.println(classC.getNum());

        classC.setNum(30);
        System.out.println(classC.getNum());

        System.out.println("ClassA.getClassC(): ");
        System.out.println(a.getClassC() == classC);
        System.out.println(b.getClassC() == classC);
    }
}
