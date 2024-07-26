package Interface;

/**
 * 351
 *  接口的使用
 *  1. 接口的使用上, 也满足多态性: 我们不能实例化接口, 但可以实例化实现了接口内所有抽象方法的类
 *  2. 接口实际上就是定义了一组规范
 *  3. 开发中, 体会面向接口编程
 *
 * @author xueshuo
 * @create 2023-01-28 3:18 pm
 */
public class USBTest {
    public static void main(String[] args) {
        Computer com = new Computer();
        // 1. 创建接口非匿名实现类的非匿名对象
        Flash flash = new Flash();
        com.transferData(flash);        // 我们不能实例化接口, 但可以实例化实现了接口内所有抽象方法的类

        // 2. 创建接口非匿名实现类的匿名对象
        com.transferData(new Printer());

        // 3. 创建接口的匿名实现类的非匿名对象 (看似在实例化接口, 实则是在实例化接口的匿名实现类)
        USB phone = new USB(){

            @Override
            public void start() {
                System.out.println("Phone starts to work");
            }

            @Override
            public void stop() {
                System.out.println("phone ends work");
            }
        };
        com.transferData(phone);

        // 4. 创建接口的匿名实现类的匿名对象
        com.transferData(new USB(){

            @Override
            public void start() {
                System.out.println("mp3 starts to work");
            }

            @Override
            public void stop() {
                System.out.println("mp3 ends work");
            }
        });

    }

}


class Computer{
    /**
     *
     * @param usb USB usb = new Flash(), 把USB接口作为函数的argument是为了说明, Computer的这个方法需要实现了USB接口的类作为参数输入
     */
    public void transferData(USB usb){
        usb.start();

        System.out.println("transfer details: ************");

        usb.stop();
    }
}

interface USB{
    // 常量: 定义了长, 宽, 最大最小的传输速度

    void start();
    void stop();

}

class Flash implements USB{

    @Override
    public void start() {
        System.out.println("Flash start to work");
    }

    @Override
    public void stop() {
        System.out.println("Flash drive end work");
    }
}

class Printer implements USB{

    @Override
    public void start() {
        System.out.println("Printer starts to work");
    }

    @Override
    public void stop() {
        System.out.println("Printer ends work");
    }
}
