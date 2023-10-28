package class04_other.annotation;

/**
 * @author shkstart
 * @create 9:35
 */
@Table(value="t_customer")      // annotation的成员value的值社为"t_customer": 表示和数据库中的t_customer表对应
public class Customer {
    @Column(columnName = "cust_name",columnType = "varchar(15)")    // 表示所修饰的字段对应database的column
    private String name;
    @Column(columnName = "cust_age",columnType = "int")
    public int age;

    public Customer(){
//        System.out.println("Customer()...");
    }

    public Customer(int age){
        this.age = age;
    }

    private Customer(String name, int age){
        this.name = name;
        this.age = age;
    }

    public void show(){
        System.out.println("你好，我是一个Customer");
    }

    private String showNation(String nation){
        return "我的国籍是：" + nation;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

