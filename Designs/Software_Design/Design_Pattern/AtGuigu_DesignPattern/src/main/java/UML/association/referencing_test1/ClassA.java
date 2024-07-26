package UML.association.referencing_test1;

/**
 * @author xueshuo
 * @create 2023-04-04 7:38 am
 */
public class ClassA {
    private ClassC classC;

    public ClassA(ClassC classC) {
        this.classC = classC;
    }

    public ClassC getClassC() {
        return classC;
    }

    public void setClassC(ClassC classC) {
        this.classC = classC;
    }
}
