package class03_metaAnnotation;


/**
 * @author xueshuo
 * @create 2023-02-21 9:24 am
 */
public class Student extends Person implements Info {
    // 重写父类的方法
    @Override
    public void walk(){
        System.out.println("student walk");
    }

    // 实现接口中的方法
    @Override
    public void show() {

    }
}

interface Info{
    void show();
}
