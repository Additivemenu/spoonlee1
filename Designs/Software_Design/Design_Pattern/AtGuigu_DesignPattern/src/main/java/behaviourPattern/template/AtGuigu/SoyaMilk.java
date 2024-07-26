package behaviourPattern.template.AtGuigu;

/**
 * 抽象类表示豆浆
 * @author xueshuo
 * @create 2023-05-02 10:39 pm
 */

public abstract class SoyaMilk {

    // 模板方法, 一般做成final, 不让子类去override
    final void make(){
        select();
        addCondiments();
        soak();
        beat();
    }

    // select materials
    void select(){
        System.out.println("step1: select freshing soy");
    }

    // 添加配料
    abstract void addCondiments();

    // 浸泡
    void soak(){
        System.out.println("第三部, 黄豆和配料开始浸泡, needing 3 hours");
    }

    //
    void beat(){
        System.out.println("第四步, 黄豆和配料放到豆浆机去打碎");
    }


}
