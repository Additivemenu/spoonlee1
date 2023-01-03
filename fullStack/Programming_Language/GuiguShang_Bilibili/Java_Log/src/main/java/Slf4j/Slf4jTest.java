package Slf4j;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author xueshuo
 * @create 2022-12-27 20:07
 */
public class Slf4jTest {

    public static final Logger LOGGER = LoggerFactory.getLogger(Slf4jTest.class);

    // 快速入门
    @Test
    public void test1(){
        // 日志输出
        LOGGER.error("i am error");
        LOGGER.warn("warning");
        LOGGER.info("info");
        LOGGER.debug("debug");
        LOGGER.trace("trace");

        // 使用占位符输出
        String name = "xueshuo li";
        Integer age = 24;
        LOGGER.info("user: {},{}", name, age);

        // 将系统异常信息输出
        try {
            int i = 1/0;
        } catch (Exception e) {
            LOGGER.warn("warning: "+ e);
            // LOGGER.error();
        }
    }


}
