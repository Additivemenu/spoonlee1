package threadSync.practice;

/**
 *  P438
 *
 *  银行有一个账户
 *  有两个储户分别向同一个账户存3000元, 每次存1000, 存3次, 每次存完打印账户余额
 *
 *  分析：
 *  1. 是否是多线程问题? 是的, 两个线程分别是代表储户的线程
 *  2. 是否涉及共享数据? 是的, 账户 (账户余额)
 *  3. 涉及到线程安全吗? 有
 *  4. 考虑如何解决线程安全问题 --> 同步机制: 三种方式
 *
 * @author xueshuo
 * @create 2023-02-25 4:34 pm
 */
public class AccountTest {
    public static void main(String[] args) {
        Account acct = new Account();
        // c1, c2同时依赖于acct, 于是他们就共享同一个acct的数据了
        Customer c1 = new Customer(acct);
        Customer c2 = new Customer(acct);

        c1.setName("tom");
        c2.setName("alice");

        c1.start();
        c2.start();
    }
}


class Account{
    private double balance;

    public Account(double balance) {
        this.balance = balance;
    }

    // 存钱
    public synchronized void deposit(double amt){
        if (amt > 0){

            balance += amt;

            // 引入
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println(Thread.currentThread().getName() +  ": 存钱成功, 余额为: "+ balance);
        }
    }

    public Account() {
    }
}


class Customer extends Thread{
    private Account acct;
    public Customer(Account acct){
        this.acct = acct;
    }

    @Override
    public void run(){
        for(int i = 0; i < 3; i++){
            acct.deposit(1000);
        }
    }



}