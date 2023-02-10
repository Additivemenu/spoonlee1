package principles.dependencyInversion.improvement;

/**
 * @author xueshuo
 * @create 2023-02-10 11:20 pm
 */
public class DependencyInversion2 {
    public static void main(String[] args) {
        // 客户端(指Person)无需改变
        Person p = new Person();
        p.receive(new Email());

        p.receive(new Wechat());
    }

}

/**
 * 定义抽象: 接口
 */
interface IReceiver{
    public String getInfo();
}

// 定义细节: 实现类
class Email implements IReceiver{
    public String getInfo(){
        return "email info: hello world!";
    }
}

class Wechat implements IReceiver{
    @Override
    public String getInfo() {
        return "wechat info: hello wechat!";
    }
}

// 完成Person接收消息的功能
// 方式二:

class Person{
    public void receive(IReceiver receiver){
        System.out.println(receiver.getInfo());
    }
}
