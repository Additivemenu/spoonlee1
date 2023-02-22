package class04_JDK8Annotation;

import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.ElementType.MODULE;

/**
 * @author xueshuo
 * @create 2023-02-21 9:35 am
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({TYPE, FIELD, METHOD, PARAMETER, LOCAL_VARIABLE, MODULE})
@Inherited
public @interface MyAnnotations {
    MyAnnotation[] value();
}
