package java8.OptionalClass;

import org.junit.Test;

import java.util.Optional;

/**
 * Optional Class: 为了避免出现NullPointerException
 *
 * 常用方法: ofNullable()
 *          orElse(T other)
 *
 */

public class OptionalTest {

    /**
     * + `Optional.of(T t)`: 创建一个Optional instance, **t必须非空**
     * + `Optional.empty()`: 创建一个空的Optional instance
     * + `Optional.ofNullable(T t)`: t可以为null
     */
    @Test
    public void test1(){
        Girl girl = new Girl();
        Optional<Girl> optionalGirl = Optional.of(girl);        // Optional.of(T t): t must not be null
    }

    @Test
    public void test2(){
        Girl girl = new Girl();
        girl = null;
        Optional<Girl> optionalGirl = Optional.ofNullable(girl);        // girl must not be null
        System.out.println(optionalGirl);
    }

    // test3: 最naive的写法---------------------------------------------
    public String getGirlName(Boy boy){
        return boy.getGirl().getName();     // NullPointer is possible
    }

    @Test
    public void test3(){
        Boy boy = new Boy();
        String girlName = getGirlName(boy);
        System.out.println(girlName);   // throw NullPointerException
    }

    // test4: 优化上面的写法------------------------------------------------------
    public String getGirlName1(Boy boy){
        if(boy != null) {
            Girl girl = boy.getGirl();
            if (girl != null) {
                return girl.getName();
            }
        }
        return null;
    }

    @Test
    public void test4(){
        Boy boy = new Boy();
        String girlName = getGirlName1(boy);
        System.out.println(girlName);
    }

    // test5: 使用Optional来优化----------------------------------------------------
    public String getGirlName2(Boy boy){
        Optional<Boy> boyOptional = Optional.ofNullable(boy);

        // `T orElse(T other)`: 如果Optional容器内非空则将其返回, 若是空的则返回()里指定的other对象
        Boy boy1 = boyOptional.orElse(new Boy(new Girl("Triss")));     // boy1一定非空, 但boy1中的girl不一定非空

        Girl girl = boy1.getGirl();
        Optional<Girl> girlOptional = Optional.ofNullable(girl);
        Girl girl1 = girlOptional.orElse(new Girl("Ciri"));     // girl1一定非空

        return girl1.getName();
    }

    @Test
    public void test5(){
        Boy boy = null;
        String girlName1 = getGirlName2(boy);
        System.out.println(girlName1);          // "Triss"

        Boy boy1 = new Boy();
        String girlName2 = getGirlName2(boy1);
        System.out.println(girlName2);          // "Ciri"

        Boy boy2 = new Boy(new Girl("Yen"));
        System.out.println(getGirlName2(boy2)); // "Yen"
    }

}
