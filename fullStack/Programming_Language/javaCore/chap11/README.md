References:

:computer: [B站狂人说Java: GUI ](https://www.bilibili.com/video/BV1DJ411B75F/?spm_id_from=333.337.search-card.all.click&vd_source=c6866d088ad067762877e4b6b23ab9df)



# Intro to GUI

1

组件:

+ 窗口
+ 弹窗
+ 面板
+ 文本框
+ 列表框
+ 按钮
+ 图片
+ 交互
  + 监听事件
    + 鼠标
    + 键盘



## 简介

Gui的核心技术: Swing, AWT. 

+ 不流行, 应为界面不美观

+ 需要jre环境, 比较大

为什么我们要学习? 

+ MVC的基础, 了解监听

+ 可以写出自己心中想要的一些小工具



# 2. AWT

2

 Abstract Windows Tool, 是Swing 前身

## 2.1 Atw介绍

包含了很多的类和接口! GUI: 图形用户界面编程

元素: 

+ 窗口
+ 按钮
+ 文本框



java.awt 架构

![Awt1](/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Programming_Language/javaCore/chap11/Src_md/Awt1.jpg)



## 2.2 组件和容器



```java
// GUI 第一个界面
public class TestFrame {

    public static void main(String[] args) {
        // Frame  ---> JDK, 或看源码
        Frame frame = new Frame("my first Java GUI window!");

        // 需要设置可见性, width, height
        frame.setVisible(true);

        // 设置窗口大小
        frame.setSize(400, 400);

        // 设置颜色
        frame.setBackground(Color.black);

        // 弹出的初始位置
        frame.setLocation(200, 200);

        // 设置大小固定
        frame.setResizable(false);
    }
}
```



但是发现弹窗关不掉



尝试练习封装

```java
public class TestFrame2 {

    public static void main(String[] args) {
        // 展示多个窗口
        MyFrame myFrame1 = new MyFrame(100, 100, 200, 200, Color.blue);
        MyFrame myFrame2 = new MyFrame(300, 100, 200, 200, Color.yellow);
        MyFrame myFrame3 = new MyFrame(500, 100, 200, 200, Color.pink);
        MyFrame myFrame4 = new MyFrame(700, 100, 200, 200, Color.green);
    }
}


class MyFrame extends Frame {
    static int id = 0;  // 可能存在多个窗口, 需要计数器

    public MyFrame(int x, int y, int width, int height, Color color){
        super("My frame" + (++id));

        setBounds(x, y, width, height);
        setBackground(color);
        setVisible(true);
    }

}

```



## 2.3 Panel 面板讲解

P4 

```java
// panel: 可以看成是一个空间, 但不能单独存在, 需要放在frame里
public class TestPanel {
    public static void main(String[] args) {
        Frame frame = new Frame();
        Panel panel = new Panel();

        // 设置布局
        frame.setLayout(null);

        // frame坐标 --------------------------------------
        frame.setBounds(300, 300, 500, 500);
        frame.setBackground(Color.green);

        // panel设置坐标 -----------------------------------
        panel.setBounds(50,50,400,400);
        panel.setBackground(Color.blue);

        frame.add(panel);
        frame.setVisible(true);

        // 监听事件, 监听窗口关闭事件 -------------------------
        // 适配器模式
        frame.addWindowListener(new WindowAdapter() {
            // 点击关闭的时候需要做的事情
            @Override
            public void windowClosing(WindowEvent e) {
                // 结束程序
                System.exit(0);     // 正常退出
            }
        });
    }

}
```



### 3种布局管理器

P5

+ flow layout
+ Grid layout (东西南北中)
+ grid layout



Flow

```java
public class TestFlowLayout {
    public static void main(String[] args) {
        Frame frame = new Frame();

        // 组件-按钮
        Button button1 = new Button("button1");
        Button button2 = new Button("button2");
        Button button3 = new Button("button3");

        // 设置为flow layout
//        frame.setLayout(new FlowLayout());			// 默认剧中
//        frame.setLayout(new FlowLayout(FlowLayout.LEFT));		// 居左
        frame.setLayout(new FlowLayout(FlowLayout.RIGHT));		//  居右
        
        frame.setSize(200, 200);

        frame.add(button1);
        frame.add(button2);
        frame.add(button3);

        //
        frame.setVisible(true);
    }

}
```

Border

```java
public class TestBorderLayout {

    public static void main(String[] args) {
        Frame frame = new Frame("TestBorderLayout");

        Button east = new Button("East");
        Button west = new Button("West");
        Button south = new Button("South");
        Button north = new Button("North");
        Button center = new Button("Center");

        frame.add(east, BorderLayout.EAST);
        frame.add(west, BorderLayout.WEST);
        frame.add(south, BorderLayout.SOUTH);
        frame.add(north, BorderLayout.NORTH);
        frame.add(center, BorderLayout.CENTER);

        frame.setSize(500, 500);
        frame.setVisible(true);
    }
}
```



Grid

```java
public class TestGridLayout {
    public static void main(String[] args) {
        Frame frame = new Frame("TestGridLayout");

        Button btn1 = new Button("btn1");
        Button btn2 = new Button("btn2");
        Button btn3 = new Button("btn3");
        Button btn4 = new Button("btn4");
        Button btn5 = new Button("btn5");
        Button btn6 = new Button("btn6");

        frame.setLayout(new GridLayout(3,2));
        frame.setSize(500,500);

        frame.add(btn1);
        frame.add(btn2);
        frame.add(btn3);
        frame.add(btn4);
        frame.add(btn5);
        frame.add(btn6);

        frame.setVisible(true);
    }
}
```



### 关于布局的课堂练习

P6

```java
public class ExDemo {

    public static void main(String[] args) {
        Frame frame = new Frame();

        frame.setSize(500,300);
        frame.setLocation(300,400);
        frame.setVisible(true);
        frame.setLayout(new GridLayout(2,1));

        // 4 个 panel
        Panel p1 = new Panel(new BorderLayout());
        Panel p2 = new Panel(new GridLayout(2,1));

        Panel p3 = new Panel(new BorderLayout());
        Panel p4 = new Panel(new GridLayout(2,2));

        // frame上半部分 ----------------------------------------------
        p1.add(new Button("East - 1"), BorderLayout.EAST);
        p1.add(new Button("West - 1"), BorderLayout.WEST);
        // 中间
        p2.add(new Button("p2-btn-1"));
        p2.add(new Button("p2-btn-2"));
        p1.add(p2, BorderLayout.CENTER);

        // frame下半部分 ----------------------------------------------
        p3.add(new Button("East - 2"), BorderLayout.EAST);
        p3.add(new Button("West - 2"), BorderLayout.WEST);
        // 中间
        for(int i = 0; i < 4; i++){
            p4.add(new Button("for-" + i));
        }
        p3.add(p4, BorderLayout.CENTER);

        frame.add(p1);
        frame.add(p3);
      
        frame.addWindowListener(new WindowAdapter() {
              @Override
              public void windowClosing(WindowEvent e) {
                  System.exit(0);
              }
          });
    }
}
```

Result

![layout-demo](/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Programming_Language/javaCore/chap11/Src_md/layout-demo.png)



总结:

+ Frame是顶级窗口
+ Panel无法单独显示, 必须添加到某个容器中
+ 布局管理器
  + flow
  + border
  + grid
+ container的属性: size, background, visible, location



## 2.4 :moon: 事件监听

P7

当某个事情发生时, 干什么?



### Button 监听

:gem: demo1

给button绑定一个ActionListener的实现类的对象

+ ActionListener其实是functional interface, 用lambda更方便

```java
public class TestAction {
    // 按下按钮的时候, 触发事件
    public static void main(String[] args) {
        Frame frame = new Frame();

        // button
        Button button = new Button("click me");
        button.addActionListener(new MyActionListener());

        // 文本框 也可以
        
        frame.add(button, BorderLayout.CENTER);
        frame.setSize(500,500);
        // frame.pack();

        windowClose(frame);
        frame.setVisible(true);
    }
    
    // 封装 关闭窗体的事件
    private static void windowClose(Frame frame){
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
    }
}


// ActionListner 是函数式接口, 可以用lambda 表达式
class MyActionListener implements ActionListener {

    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("aaaa");
    }
}
```





:gem: demo2

多个button共享ActionListener

```java
public class TestAction2 {

    public static void main(String[] args) {
        // 两个按钮, 实现同一个监听
        // 开始 停止
        Frame frame = new Frame("start - stop");

        Button btn_start = new Button("start");
        Button btn_stop = new Button("stop");

        // 可以显式定义触发会返回的信息, 如果不显式定义, 则返回默认值
        btn_stop.setActionCommand("this is button: stop");

        MyMonitor myMonitor = new MyMonitor();
        btn_start.addActionListener(myMonitor);
        btn_stop.addActionListener(myMonitor);

        frame.add(btn_start, BorderLayout.NORTH);
        frame.add(btn_stop, BorderLayout.SOUTH);

        frame.pack();
        frame.setVisible(true);
    }
}

class MyMonitor implements ActionListener{

    @Override
    public void actionPerformed(ActionEvent e) {
        //
        System.out.println("the button is clicked, msg: "+ e.getActionCommand());       // 获取按钮信息
        
        // 
        if(e.getActionCommand().equals("start")){
            System.out.println("this is start button! do something for start button ...");
        }

    }
}
```



### TextField 监听

P8

+ 这里的写法比较标准, 一般作为application entry的main()方法中只写启动一行代码.

+ 通过`e.getSource()` 来获取绑定的textFiled的内容

```java
public class TestText1 {
    public static void main(String[] args) {
        new MyFrame();
    }

}


class MyFrame extends Frame {
    public MyFrame(){
        TextField textField = new TextField();
        add(textField);

        // 监听 textField输入的文字
        // 按下enter键, 就会触发这个输入框的被绑定的ActionListener中定义的事件(ActionPerformed)
        textField.addActionListener(new MyActionListener2());

        // 设置替换编码
        textField.setEchoChar('*');     // 前端输入框输入的文字会被替换为'*'

        pack();
        setVisible(true);

    }
}


class MyActionListener2 implements ActionListener{

    // 定义事件:
    @Override
    public void actionPerformed(ActionEvent e) {

        TextField field = (TextField) e.getSource();      // 获得一些资源，返回对象
        System.out.println(field.getText());    // 获得输入框中的文本
        field.setText("");      // 清空文本框
    }
}
```



### :moon: 简易计算器, 组合 + 内部类 回顾复习

P9



OOP: 想要在类A中使用类B的方法和属性,  采用 组合 优于 继承

```java
// 继承
class A extends B {
  
}

// 组合
class A {
  private B b;
}


// 使用内部类的写法, 更加方便
class B {
  
  
  class A {
    // 内部类A 可以直接访问和使用外部类 B 的属性和方法
  }
}
```



#### :gem: 基础写法

有点面向过程了, 不够面向对象

```java
public class CalculatorTest {
    public static void main(String[] args) {
        new Calculator();
    }
}


// Calculator窗口
class Calculator extends Frame {

    public Calculator(){

        // 3个文本框
        TextField num1 = new TextField(10);     // max 10 个字符
        TextField num2 = new TextField(10);
        TextField sum = new TextField(10);

        // 1 个按钮 "等号"
        Button button = new Button("=");
        button.addActionListener(new MyCalculatorListener(num1, num2, sum));        // 注意事件如何定义, 如何传参

        // 1 个标签
        Label label = new Label("+");

        setLayout(new FlowLayout());

        add(num1);
        add(label);
        add(num2);
        add(button);
        add(sum);

        pack();
        setVisible(true);
    }

}


// 监听器类
class MyCalculatorListener implements ActionListener{


    // 获取3个变量
    private TextField num1, num2, sum;

    public MyCalculatorListener(TextField num1, TextField num2, TextField sum){
        this.num1 = num1;
        this.num2 = num2;
        this.sum = sum;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // 1. 获得 num1, num2
        int n1 = Integer.parseInt(num1.getText());
        int n2 = Integer.parseInt(num2.getText());

        // 2. 将num1, num2 加法运算后 的结果, 放到第三个框
        int res = n1 + n2;
        sum.setText("" + res);

        // 3. 清楚num1, num2框内的内容
        num1.setText("");
        num2.setText("");
    }
}
```



#### :gem: 面向对象写法

+ 把Calculator聚合到监听器类内部, 以使得监听器类可以访问和使用Calculator内部的属性和方法

```java
public class CalculatorTest {
    public static void main(String[] args) {
        new Calculator().loadFrame();
    }
}


// Calculator窗口
class Calculator extends Frame {
    // field
    TextField num1,num2,sum;

    // methods
    public void loadFrame(){
        // step1 定义与初始化 Frame内部的组件
        // 3个文本框
        num1 = new TextField(10);     // max 10 个字符
        num2 = new TextField(10);
        sum = new TextField(10);
        // 1 个按钮 "等号"
        Button button = new Button("=");
        // 1 个标签
        Label label = new Label("+");


        // step2 绑定监听器, 点击button 触发运算操作, 并清空num1, num2的text
        button.addActionListener(new MyCalculatorListener(this));        // 注意事件如何定义, 如何传参


        // step3 布局
        setLayout(new FlowLayout());

        add(num1);
        add(label);
        add(num2);
        add(button);
        add(sum);

        pack();
        setVisible(true);
    }
}


// 监听器类
class MyCalculatorListener implements ActionListener{

    // 在一个类中组合另一个类, 以在本类中使用另一个类的方法和属性
    Calculator calculator;

    public MyCalculatorListener(Calculator calculator){
        this.calculator = calculator;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // 1. 获得 num1, num2
        int n1 = Integer.parseInt(calculator.num1.getText());
        int n2 = Integer.parseInt(calculator.num2.getText());

        // 2. 将num1, num2 加法运算后 的结果, 放到第三个框
        int res = n1 + n2;
        calculator.sum.setText("" + res);

        // 3. 清楚num1, num2框内的内容
        calculator.num1.setText("");
        calculator.num2.setText("");
    }
}
```





#### :gem: 内部类写法

+ 更好地包装, 内部类可以畅通无阻去获取外部类的属性和方法

```java
public class CalculatorTest {
    public static void main(String[] args) {
        new Calculator().loadFrame();
    }
}


// Calculator窗口组件
class Calculator extends Frame {
    // field
    TextField num1,num2,sum;

    // methods
    public void loadFrame(){
        // step1 定义与初始化 Frame内部的组件
        // 3个文本框
        num1 = new TextField(10);     // max 10 个字符
        num2 = new TextField(10);
        sum = new TextField(10);
        // 1 个按钮 "等号"
        Button button = new Button("=");
        // 1 个标签
        Label label = new Label("+");


        // step2 绑定监听器, 点击button 触发运算操作, 并清空num1, num2的text
        button.addActionListener(new MyCalculatorListener());        // 注意事件如何定义, 如何传参


        // step3 布局
        setLayout(new FlowLayout());

        add(num1);
        add(label);
        add(num2);
        add(button);
        add(sum);

        pack();
        setVisible(true);
    }


    // 内部类的最大好处， 就是可以畅通无阻去获取外部类的属性和方法
    // 这里我们直接去获取Calculator内部结构
    private class MyCalculatorListener implements ActionListener{

        @Override
        public void actionPerformed(ActionEvent e) {
            // 1. 获得 num1, num2
            int n1 = Integer.parseInt(num1.getText());
            int n2 = Integer.parseInt(num2.getText());

            // 2. 将num1, num2 加法运算后 的结果, 放到第三个框
            int res = n1 + n2;
            sum.setText("" + res);

            // 3. 清楚num1, num2框内的内容
            num1.setText("");
            num2.setText("");
        }
    }

}
```



## 2.5 画笔

P10



```java
public class TestPaint {
    public static void main(String[] args) {
        new MyPaint().loadFrame();
    }
}

// MyPaint Frame组件
class MyPaint extends Frame {

    public void loadFrame(){

        setBounds(200, 200, 800, 600);
        setVisible(true);

    }

    // 画笔
    @Override
    public void paint(Graphics g) {

        // 画笔需要颜色， 可以画画
        g.setColor(Color.red);
        g.drawOval(100,100, 100, 100);      // hollow
        g.fillOval(200,200, 100, 100);      // solid

        g.setColor(Color.green);
        g.fillRect(300,300, 100, 100);

        // 养成习惯: 画笔用完, 将它还原到最初的颜色
        g.setColor(Color.black);
    }


}
```







## 鼠标监听事件

P11







## 窗口监听事件





## 键盘监听事件







# 3. Swing

## JFrame窗体

14







# 4. 贪吃蛇demo