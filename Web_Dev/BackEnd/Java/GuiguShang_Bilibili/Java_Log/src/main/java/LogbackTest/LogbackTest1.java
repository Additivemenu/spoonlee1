package LogbackTest;

import org.junit.Test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author xueshuo
 * @create 2022-12-27 19:23
 */
public class LogbackTest1 {
    public static final Logger LOGGER = LoggerFactory.getLogger(LogbackTest1.class);

    // 快速入门 logback
    @Test
    public  void test01(){
        //for (int i=0; i<1000; i++) {
            LOGGER.error("error");
            LOGGER.warn("warning");
            LOGGER.info("info");
            LOGGER.debug("debug");          // default level in logback
            LOGGER.trace("trace");
        //}
    }
}
