package Enum;

/**
 * 使用enum关键字定义枚举类
 * 说明: 使用enum关键字定义的枚举类 默认继承于 class java.lang.Enum
 *
 *
 * @author xueshuo
 * @create 2023-04-16 9:28 pm
 */
public class SeasonTest1 {
    public static void main(String[] args) {
        Season1 summer = Season1.SUMMER;

        // toString()
        System.out.println(summer);
        System.out.println(Season1.class.getSuperclass());

        // values(): 返回枚举类型的对象数组。该方法可以很方便地遍历所有的 枚举值。
        Season1[] values = Season1.values();
        for (int i = 0; i < values.length; i++){
            System.out.println(values[i]);
        }

        // valueOf(String objName): 根据提供的objName, 返回枚举类中对象名是objName的对象.
        // 如果没有objName的枚举类内的对象, 则throw  IllegalArgumentException
        Season1 winter = Season1.valueOf("WINTER");
        System.out.println(winter);

        // 接口内的规定的方法实现
        winter.show();

    }
}

interface Info{
    void show();
}

// enum
enum Season1 implements  Info{

    // 1. 提供当前枚举类的对象, 多个对象之间用 ", "隔开， 末尾对象";"结束
    SPRING ("spring", "spring is warm!"){
        @Override
        public void show() {
            System.out.println("spring hahahaha");
        }
    },
    SUMMER("summer", "summer is hot!"){
        @Override
        public void show() {
            System.out.println("summer hahahah");
        }
    },
    FALL("fall", "fall is cool!"){
        @Override
        public void show() {
            System.out.println("fall hahahaha");
        }
    },
    WINTER("winter", "winter is cold!"){
        @Override
        public void show() {
            System.out.println("winter hahahaha");
        }
    };


    private final String seasonName;
    private final String seasonDesc;


    private Season1(String seasonName, String seasonDesc) {
        this.seasonName = seasonName;
        this.seasonDesc = seasonDesc;
    }

    // 4. 其他诉求: 获取枚举类对象的属性
    public String getSeasonName() {
        return seasonName;
    }

    public String getSeasonDesc() {
        return seasonDesc;
    }

    @Override
    public void show() {
        System.out.println("this is a season!");
    }

//    @Override
//    public String toString() {
//        return "Season{" +
//                "seasonName='" + seasonName + '\'' +
//                ", seasonDesc='" + seasonDesc + '\'' +
//                '}';
//    }
}