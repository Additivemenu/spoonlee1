package structuralPattern.bridge;

/**
 * @author xueshuo
 * @create 2023-08-08 11:58 am
 */
public class FoldablePhone extends Phone{
    public FoldablePhone(Brand brand) {
        super(brand);
    }

    public void open(){
        super.open();
        System.out.println("foldable phone:");
    }

    public void close(){
        super.close();
        System.out.println("foldable phone:");
    }

    public void call(){
        super.call();
        System.out.println("foldable phone:");
    }

}
