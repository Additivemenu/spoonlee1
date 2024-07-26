package principles.dependencyInversion;

/**
 * @author xueshuo
 * @create 2023-02-10 11:13 pm
 */
public class DependencyInversion {
    public static void main(String[] args) {
        Person p = new Person();
        p.receive(new Email());
    }

}

class Email{
    public String getInfo(){
        return "email info: hello world!";
    }
}

// 完成Person接收消息的功能
// 方式一:
// 1. 优点: 简单容易想到
// 2. 缺点: 如果我们获取的对象是微信, 短信等, 则新增类, 同时Person也要增加相应的接收方法 (需要重载receive()方法比较麻烦)
//  解决思路: 引入一个抽象的接口 IReceiver, 表示接收者, 这样Person类与接口发生依赖
//  这时因为Email, 微信都属于接收的范围, 则他们各自实现IReceiver接口就ok, 这样就符合依赖倒转原则
class Person{
    public void receive(Email email){
        System.out.println(email.getInfo());
    }
}
