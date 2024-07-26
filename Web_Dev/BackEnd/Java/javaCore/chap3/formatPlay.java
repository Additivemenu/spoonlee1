package javaCore.chap3;

public class formatPlay {
    public static void main(String[] args) {
        String s = "string";
        double pi = 3.1415926535;

        System.out.printf("\"%s\" has %d characters %n", s, s.length());
        System.out.printf("pi to 4 places: %.4f%n", pi);

        System.out.printf("Right>>%9.4f<<%n", pi); // 右对齐
        System.out.printf("Left>>%-9.4f<<%n", pi); // 左对齐

        System.out.printf("$%.2f%n", 9.99);
        System.out.printf("%06.2f%n", 9.99);// 一共6个字符, 精度为小数点后2位; %n end the line
        System.out.printf("%06.2f\n", 9.99);// 一共6个字符(算上小数点), 精度为小数点后2位
        // There is also one specifier that doesn't correspond to an argument. It is
        // "%n" which outputs a line break. A "\n" can also be used in some cases, but
        // since "%n" always outputs the correct platform-specific line separator, it is
        // portable across platforms whereas"\n" is not.

        double e = 250000.0;
        System.out.printf("%.2f%n", e);
        System.out.printf("%.2e%n", e);
    }
}
