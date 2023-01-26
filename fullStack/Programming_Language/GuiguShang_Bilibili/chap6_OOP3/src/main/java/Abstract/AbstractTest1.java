package Abstract;

/**
 * abstract 使用上的注意点:
 *  1. abstract 不能用来修饰: 属性, 构造器
 *
 *  2. abstract 不能用来修饰:
 *              private method (父类中的抽象方法总是要被其后代重写的， 如果有抽象方法为私有的, 那么后代类就没法重写抽象父类中的抽象方法了),
 *              static method ( A static method belongs to class not to object instance thus it cannot be overridden or implemented in a child class.
 *                              So there is no use of making a static method as abstract.)
 *                        子类和父类中的同名同参数的方法:
 *                             如果都声明为非static的(考虑重写)
 *                             如果都声明为static的(不是重写)
 *              final class, final method (如果可以修饰, 那当前的抽象类就不能被继承了， 定义抽象类就没有意义了; 抽象类就是鼓励你去提供子类, final class禁止提供子类 )
 *
 * @author xueshuo
 * @create 2023-01-24 11:17 am
 */
public class AbstractTest1 {



}
