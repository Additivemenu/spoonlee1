package behaviourPattern.template.AtGuigu.improvement;

import behaviourPattern.template.AtGuigu.improvement.SoyaMilk;

/**
 * @author xueshuo
 * @create 2023-05-02 10:51 pm
 */
public class PureSoyMilk extends SoyaMilk {

    @Override
    void addCondiments() {

    }

    @Override
    boolean customerWantCondiments() {
        return false;
    }
}
