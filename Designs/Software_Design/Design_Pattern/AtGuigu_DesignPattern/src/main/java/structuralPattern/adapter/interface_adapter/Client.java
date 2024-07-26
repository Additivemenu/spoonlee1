package structuralPattern.adapter.interface_adapter;

/**
 * @author xueshuo
 * @create 2023-04-26 9:20 am
 */
public class Client {
    public static void main(String[] args) {
        AbsAdapter m1Adapter = new AbsAdapter() {
            // 只需要override我们关心的接口方法
            @Override
            public void m1() {
                System.out.println("use m1 method");
            }
        };

        m1Adapter.m1();
    }
}
