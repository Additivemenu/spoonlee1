package UML.aggregation;

/**
 * @author xueshuo
 * @create 2023-02-11 3:33 pm
 */
public class Computer {
    private Mouse mouse;        // 我们认为 mouse 可以与 computer 分离
    private Monitor monitor;    // 我们认为 monitor 可以与 computer 分离

    public void setMouse(Mouse mouse) {
        this.mouse = mouse;
    }

    public void setMonitor(Monitor monitor) {
        this.monitor = monitor;
    }
}
