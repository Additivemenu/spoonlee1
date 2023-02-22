package class03_metaAnnotation;

import org.junit.Test;

import java.lang.annotation.Annotation;

/**
 *
 * JDK 提供的元注解: 对现有的注解进行解释说明的注解
 *  Retention: 指定所修饰的Annotation的声明周期： SOURCE/CLASS(默认)/RUNTIME
 *              只有声明为RUNTIME的生命周期的注解, 才能通过反射获取
 *  Target: 用于指定被修饰的 Annotation 能用于 修饰哪些程序元素
 *  Documented: 表示所修饰的注解在被javadoc解析时, 保留下来
 *  Inherited:
 *
 *  一般自定义注解会指明Retention与Target
 *
 *  通过反射获取注解信息 --- 到反射系统讲解
 *
 * @author xueshuo
 * @create 2023-02-21 8:51 am
 */
public class MetaAnnotationTest {

    @Test
    public void testGetAnnotation(){
        Class studentClass = Student.class;

        Annotation[] annotations = studentClass.getAnnotations();
        for(int i = 0; i< annotations.length; i++){
            System.out.println(annotations[i]);         // @class02_customizingAnnotation.MyAnnotation("hello world!")
        }
    }

}
