package structuralPattern.composite.AtGuigu;

/**
 * @author xueshuo
 * @create 2023-04-29 8:54 pm
 */
public class Client {
    public static void main(String[] args) {
        // 从大到小创建对象
        // 创建university
        University university = new University("清华大学", "666");

        // 创建college
        College college1 = new College("计算机学院", "计算机学院");
        College college2 = new College("信息工程学院", "信息工程学院");

        // 创建专业
        college1.add(new Department("software engineering","love java"));
        college1.add(new Department("cyber engineering", "aa"));
        college1.add(new Department("computer science", "CS"));

        college2.add(new Department("communication engineering", "通信不好学"));
        college2.add(new Department("information engineering", "信工好学"));

        university.add(college1);
        university.add(college2);

        //
        university.print();

        System.out.println("\n");
        college1.print();

    }
}
