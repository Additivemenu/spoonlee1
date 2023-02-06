package InnerClass;

/**
 * 363
 * 局部内部类的使用
 * @author xueshuo
 * @create 2023-02-06 11:00 am
 */
public class InnerClassTest1 {

    // 返回一个实现了Comparable接口的类的对象
    public Comparable getComparable(){
        // 创建一个实现了Comparable 接口的类
//        // 方式一
//        class MyComprarable implements Comparable{
//            @Override
//            public int compareTo(Object o){
//                return 0;
//            }
//        }
//
//        return new MyComprarable();


        // 方式二 返回Comparable的匿名子类的匿名对象
        return new Comparable(){
            @Override
            public int compareTo(Object o){
                return 0;
            }
        };
    }
}
