package Annotation;

/**
 * customizing Annotation
 *      1. declaration: @interface
 * @author xueshuo
 * @create 2023-01-03 10:49
 */
public @interface MyAnnotation {
    String value() default "hello";

}
