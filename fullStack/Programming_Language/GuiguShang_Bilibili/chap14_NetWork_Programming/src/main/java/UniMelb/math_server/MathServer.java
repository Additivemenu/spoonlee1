package UniMelb.math_server;

/**
 * Reference:
 *  http://clouds.cis.unimelb.edu.au/~rbuyya/java/Chapter13.pdf
 *
 * @author xueshuo
 * @create 2023-03-22 3:49 pm
 */
// MathServer.java : An implementation of the MathServer.
import java.io.*;
import java.net.*;
public class MathServer{
    protected MathService mathService;
    protected Socket socket;
    public void setMathService(MathService mathService) {
        this.mathService = mathService;
    }
    public void setSocket(Socket socket) {
        this.socket = socket;
    }


    // 业务逻辑代码所在
    public void execute() {
        try {
            // 网络编程 step1.2 提供stream, 连接物料池-------------------------------------------
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));

            // 网络编程 step2:  业务逻辑 -------------------------------------
            // read the message from client and parse the execution
            String line = reader.readLine();
            double result = parseExecution(line);       // 调用service

            System.out.println("at back end, the result is:" + result);

            // write the result back to the client
            BufferedWriter writer = new BufferedWriter(
                    new OutputStreamWriter(socket.getOutputStream()));
            writer.write(""+result);
            writer.newLine();
            writer.flush();

            // 网络编程 step3: 关闭通信资源 -----------------------------------
            // close the stream
            reader.close();
            writer.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    // the predefined protocol for the math operation is
    // operator:first value:second value
    protected double parseExecution(String line) throws IllegalArgumentException {
        double result = Double.MAX_VALUE;
        String [] elements = line.split(":");
        if (elements.length != 3)
            throw new IllegalArgumentException("parsing error!");
        double firstValue = 0;
        double secondValue = 0;
        try {
            firstValue = Double.parseDouble(elements[1]);
            secondValue = Double.parseDouble(elements[2]);
        }
        catch(Exception e) {
            throw new IllegalArgumentException("Invalid arguments!");
        }
        switch (elements[0].charAt(0)) {
            case '+':
                result = mathService.add(firstValue, secondValue);
                break;
            case '-':
                result = mathService.sub(firstValue, secondValue);
                break;
            case '*':
                result = mathService.mul(firstValue, secondValue);
                break;
            case '/':
                result = mathService.div(firstValue, secondValue);
                break;
            default:
                throw new IllegalArgumentException("Invalid math operation!");
        }
        return result;
    }

    public static void main(String [] args)throws Exception{
        // command Line input
        int port = 10000;
        if (args.length == 1) {
            try {
                port = Integer.parseInt(args[0]);
            }
            catch(Exception e){
            }
        }
        System.out.println("Math Server is running...");

        // 网络编程 step1.1: socket 连接
        // create a server socket and wait for client’s connection
        ServerSocket serverSocket = new ServerSocket(port);      // listening socket
        Socket socket = serverSocket.accept();                  // exe socket

        // run a math server that talks to the client
        MathServer mathServer = new MathServer();
        // dependency injection
        mathServer.setMathService(new PlainMathService());      // 多态写法, 将接口的实现类的对象注入
        mathServer.setSocket(socket);

        mathServer.execute();   // step1.2, step2, step3, 核心的业务代码在这里

        System.out.println("Math Server is closed...");
    }
}
