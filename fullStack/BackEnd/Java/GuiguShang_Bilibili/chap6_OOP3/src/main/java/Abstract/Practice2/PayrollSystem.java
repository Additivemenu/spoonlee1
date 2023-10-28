package Abstract.Practice2;

import java.util.Calendar;

/**
 * 定义PayrollSystem类，创建Employee变量数组并初始化，该数组存放各类雇员对象的引用。
 * 利用循环结构遍历数组元素，输出各个对象的类型,name,number,birthday,以及该对象生日。
 * 当键盘输入本月月份值时，如果本月是某个Employee对象的生日，还要输出增加工资信息。
 *
 * @author xueshuo
 * @create 2023-01-27 10:06 pm
 */
public class PayrollSystem {
    public static void main(String[] args) {
//        // 方式一
//        Scanner keyboard = new Scanner(System.in);
//        System.out.println("please enter current month number: ");
//        int month = keyboard.nextInt();

        // 方式二 Calendar常用类
        Calendar calendar= Calendar.getInstance();
        int month = calendar.get(Calendar.MONTH) + 1;// get current month (Jan-0. Feb-1, Mar-2)


        Employee[] emps = new Employee[2];      // 注意Employee 是abstract class 不能实例化, 这里只是在堆里声明一个数组, 里面元素类型为Employee

        emps[0] = new SalariedEmployee("Tom", 1002, new MyDate(1992, 2, 26),  10000);
        emps[1] = new HourlyEmployee("Jerry", 2001, new MyDate(1991, 1, 6), 200, 200 );

        for(int i = 0; i < emps.length ; i++){
            System.out.println(emps[i]);
            double earnings = emps[i].earnings();
            System.out.println("monthly salary is :" + earnings);

            if(month == emps[i].getBirthday().getMonth()){
                System.out.println("Happy birthday! Bonus $100 ");
            }

        }
    }


}
