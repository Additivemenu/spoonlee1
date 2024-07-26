package JUL;

import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.logging.*;

/**
 * @author xueshuo
 * @create 2022-12-27 10:19
 */
public class JULTest {

    // 快速入门
    @Test
    public void test1(){
        // 1. 获取Logger
        Logger logger = Logger.getLogger("test1Logger");     // static method

        // 2. 日志记录输出
        // 2.1 info级别消息
        logger.info("Hello JUL");

        // 2.2 通用方法记录
        logger.log(Level.INFO, "info msg");     // 第一个参数指定level, 第二个参数实在的消息

        // 2.3 通过占位符的方式输出变量值
        String name = "itcast";
        Integer age = 13;
        logger.log(Level.INFO, "user info: {0}, {1}", new Object[]{name, age});
    }

    //
    @Test
    public void testLogLevel(){
        // 1. getLooger
        Logger logger = Logger.getLogger("testLogLevel");

        // 2. output log
        logger.severe("severe");
        logger.warning("warning");
        logger.info("info");            // JUL默认日志级别为info, 所以默认: 级别高于info的才输出, 低于info的不输出

        logger.config("config");
        logger.fine("fine");
        logger.finer("finer");
        logger.finest("finest");
    }

    // 自定义日志级别
    @Test
    public void testLogConfig() throws IOException {
        // 1. getLooger
        Logger logger = Logger.getLogger("testLogLevel");

        // 自定义日志配置级别
        // disable log default handler
        logger.setUseParentHandlers(false);

        // add handler to logger
        // instantiate Formatter: declare output format
        SimpleFormatter simpleFormatter = new SimpleFormatter();
        // 输出到控制台-----------------------------------------------------------
        // instantiate ConsoleHandler
        ConsoleHandler consoleHandler = new ConsoleHandler();
        // link
        consoleHandler.setFormatter(simpleFormatter);
        logger.addHandler(consoleHandler);

        // now, config logger level
        logger.setLevel(Level.ALL);
        consoleHandler.setLevel(Level.ALL);

        // 输出日志到file -------------------------------------------------------
        // instantiate FileHandler
        FileHandler fileHandler = new FileHandler("jul.log");           // under Module path, jul.log must exist or NoSuchFileException will be thrown
        // link
        fileHandler.setFormatter(simpleFormatter);
        logger.addHandler(fileHandler);

        // 2. 输出日志: 之前logger关联的handler都会根据自己的level分别输出
        logger.severe("severe");
        logger.warning("warning");
        logger.info("info");            // JUL默认日志级别为info, 所以默认: 级别高于info的才输出, 低于info的不输出
        logger.config("config");
        logger.fine("fine");
        logger.finer("finer");
        logger.finest("finest");

    }

    // logger 对象的父子关系
    // 1. logger的继承关系由getLogger()的输入字符串命名决定
    // 2. 所有Logger的顶级父元素: java.util.logging.LogManager$RootLogger, name: ""
    @Test
    public void testLogParent(){

        Logger logger1 = Logger.getLogger("logger2.sub1");
        Logger logger2 = Logger.getLogger("logger2");

        //
        System.out.println(logger1.getParent() == logger2);         // true
        // 所有Logger的顶级父元素: java.util.logging.LogManager$RootLogger, name: ""
        System.out.println("logger2 parent: "+ logger2.getParent() + ", name:" + logger2.getParent().getName());

        // set logger2 Level----------------------------------------------------------------------
        // disable log default handler
        logger2.setUseParentHandlers(false);
        // add handler to logger
        // instantiate Formatter: declare output format
        SimpleFormatter simpleFormatter = new SimpleFormatter();
        // 输出到控制台-----------------------------------------------------------
        // instantiate ConsoleHandler
        ConsoleHandler consoleHandler = new ConsoleHandler();
        // link
        consoleHandler.setFormatter(simpleFormatter);
        logger2.addHandler(consoleHandler);

        // now, config logger level
        logger2.setLevel(Level.ALL);
        consoleHandler.setLevel(Level.ALL);


        // 输出日志: logger1 继承 logger2的level
        logger1.severe("severe");
        logger1.warning("warning");
        logger1.info("info");            // JUL默认日志级别为info, 所以默认: 级别高于info的才输出, 低于info的不输出
        logger1.config("config");
        logger1.fine("fine");
        logger1.finer("finer");
        logger1.finest("finest");

    }

    /**
     *加载自定义配置文件来更方便地定义logger, handlers
     */
    @Test
    public void testLogProperties() throws Exception {
        // 1. read log property file
        // -- 1.1 use class loader to generate an InputStream
        InputStream ins = JULTest.class.getClassLoader().getResourceAsStream("logging.properties");       // 注意对应file应放在Module的resource path下, 而不是直接放在Module path下

        // -- 1.2 instantiate LogManager
        LogManager logManager = LogManager.getLogManager();

        // -- 1.3 use LogManage instance to load log property file
        logManager.readConfiguration(ins);      // TODO: why ins is null????

        // 创建日志记录器
        Logger logger = Logger.getLogger("logger1");

        logger.severe("severe");
        logger.warning("warning");
        logger.info("info");            // JUL默认日志级别为info, 所以默认: 级别高于info的才输出, 低于info的不输出
        logger.config("config");
        logger.fine("fine");
        logger.finer("finer");
        logger.finest("finest");

    }



}
