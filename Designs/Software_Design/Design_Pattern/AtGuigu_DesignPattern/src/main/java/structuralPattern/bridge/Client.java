package structuralPattern.bridge;

/**
 * @author xueshuo
 * @create 2023-08-08 12:04 pm
 */
public class Client {
    public static void main(String[] args) {
        // 获取折叠式手机(样式 + 品牌)
        Phone phone1= new FoldablePhone(new Xiaomi());
        phone1.open();
        phone1.call();
        phone1.close();

        System.out.println("======================");
        Phone phone2= new FoldablePhone(new Vivo());
        phone2.open();
        phone2.call();
        phone2.close();

        System.out.println("=======================");
        Phone phone3 = new UprightPhone(new Xiaomi());
        phone3.open();
        phone3.call();
        phone3.close();
    }
}
