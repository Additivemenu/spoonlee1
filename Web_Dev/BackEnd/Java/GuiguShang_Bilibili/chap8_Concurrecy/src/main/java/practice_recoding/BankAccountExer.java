package practice_recoding;

/**
 * 438
 *
 * 银行有一个账户, 有两个储户分别向同一个账户存3000元, 每次存1000, 存3次, 每次存完打印账户余额
 *
 * 复现代码: 使用实现的方式
 *
 * @author xueshuo
 * @create 2023-03-23 4:11 pm
 */
public class BankAccountExer {

    public static void main(String[] args) {
        BankAccount bankAccount = new BankAccount();

        // 代表储户1的线程
        Thread t1 = new Thread(bankAccount);
        t1.setName("customer1");

        // 代表储户2的线程
        Thread t2 = new Thread(bankAccount);
        t2.setName("customer2");

        t1.start();
        t2.start();

    }
}


class BankAccount implements Runnable{

    private int balance = 600;

    public synchronized void deposit(int depositMoney){
        if(depositMoney > 0){
            balance += depositMoney;
            System.out.println(Thread.currentThread().getName() +  " deposited " + depositMoney + " dollars, now the balance in the account is " + balance );
        }
    }

    @Override
    public void run() {

       deposit(1000);

       // 提高线程安全问题出现的概率
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        deposit(1000);

        deposit(1000);
    }
}