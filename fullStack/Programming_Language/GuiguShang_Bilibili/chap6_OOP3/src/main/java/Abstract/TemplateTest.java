package Abstract;

/**
 * 抽象类的应用： 模版方法的设计模式
 * @author xueshuo
 * @create 2023-01-27 8:59 pm
 */
public class TemplateTest {
    public static void main(String[] args) {
        Template t = new SubTemplate();
        t.spendTime();
    }


}


abstract class Template{

    // 计算某段代码执行所需要花费的时间
    // 利用到模版方法的设计模式
    public void  spendTime(){
        long start = System.currentTimeMillis();

        code();     // 不确定的, 易变的部分, 钩子方法, 哪个子类调用, 就使用哪个子类重写的方法

        long end = System.currentTimeMillis();

        System.out.println("time spent is "+ (end - start));

    }

    public abstract void code();

}

class SubTemplate extends Template{
    @Override
    public void code(){
        // 1000 以内的质数
        for(int i = 2; i <= 1000; i++){
            boolean isFlag = true;
            for(int j = 2; j <= Math.sqrt(i); j++){
                if(i % j == 0){
                    isFlag = false;
                    break;
                }
            }

            if(isFlag){
                System.out.println(i);
            }
        }
    }
}
