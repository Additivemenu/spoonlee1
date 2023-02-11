package UML.composition;

/**
 * @author xueshuo
 * @create 2023-02-11 3:33 pm
 */
public class Computer {
    private Mouse mouse = new Mouse();        // 我们认为 mouse 可以与 computer 不可分离
    private Monitor monitor = new Monitor();    // 我们认为 monitor 可以与 computer 不可分离

    public void setMouse(Mouse mouse) {
        this.mouse = mouse;
    }

    public void setMonitor(Monitor monitor) {
        this.monitor = monitor;
    }
}
