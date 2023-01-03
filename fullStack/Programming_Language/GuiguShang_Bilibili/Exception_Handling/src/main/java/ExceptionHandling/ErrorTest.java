package ExceptionHandling;

/**
 * error: JVM都无法解决的问题, 无法编写这么针对性代码处理 e.g. StackOverflowError ,OOM
 *
 *
 */
public class ErrorTest {

    public static void main(String[] args){
        // 1. 栈溢出 java.lang.StackOverflowError
        main(args);

        // 2. 堆溢出: java.lang.OutOfMemoryError
        Integer[] arr = new Integer[1024*1024*1024];
    }
}
