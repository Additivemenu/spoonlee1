package customize_generics;

/**
 * 自定义泛泛型类
 * @author xueshuo
 * @create 2023-03-18 2:33 pm
 */
public class Order<T> {
    String orderName;
    int orderId;

    // 类的内部结构就可以使用类的Generics
    T orderT;

    public Order(){

        // 想造泛型类型的数组
//        T[] arr = new T[10];    // 编译不通过

        T[] arr = (T[]) new Object[10];

    };

    public Order(String orderName, int orderId, T orderT){
        this.orderName = orderName;
        this.orderId = orderId;
        this.orderT = orderT;
    }

    public T getOrderT () {
        return orderT;
    }

    public void setOrderT(T orderT){
        this.orderT = orderT;
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderName='" + orderName + '\'' +
                ", orderId=" + orderId +
                ", orderT=" + orderT +
                '}';
    }

    // 静态方法 中不能使用类的泛型。 因为Generics类型在创建对象时才指定
//    public static void show(T orderT){  // 报错
//        System.out.println(orderT);
//    }


    public void show(){
//        try{
//
//        }catch(T t){      // 编译不通过
//
//        }
    }

}
