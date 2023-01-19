:computer: [尚硅谷: 网络编程 618-633 (629-633 revision)](https://www.bilibili.com/video/BV1Kb411W75N?p=620&vd_source=c6866d088ad067762877e4b6b23ab9df)

---

Java Web基础

# 1. 网络编程概述
Java是 Internet 上的语言，它从语言级上提供了对网络应用程
序的支持，程序员能够很容易开发常见的网络应用程序。

Java提供的网络类库，可以实现无痛的网络连接，联网的底层 细节被隐藏在 Java 的本机安装系统里，由 JVM 进行控制。并 且 Java 实现了一个跨平台的网络库，程序员面对的是一个统一 的网络编程环境。


网络编程的目的:  
+ 直接或间接地通过网络协议与其它计算机实现数据交换，进行通讯。

网络编程中的两个主要问题:
+ 如何准确地定位网络上一台或多台主机 - IP;定位主机上的特定的应用 - port
+ 找到主机后如何可靠高效地进行数据传输 - internet communication protocol
  + OSI model vs. TCP/IP model(实际上广为应用)



# Par1. 网络通信要素概述






## 3. 通信要素1: IP, port
### 3.1 IP
619

IP address: `InetAddress`

+ uniquely identify a host on the internet
+ 本地回环地址(hostAddress): 127.0.0.1  主机名(hostName): localHost
+ IP地址分类方式1: **IPV4**, **IPV6**
  + IPV4: 4 bytes, 4个0-255. 以点分十进制表示. 2011年初已用尽.
    + e.g. 192.168.0.1
  + IPV6: 16 bytes, 写成8个无符号整数, 每个整数用4个hexdeciaml number表示. 整数之间用':'分隔 
    + e.g. 3ffe:3201:1401:1280:c8ff:fe4d:db39:1984
+ IP地址分类方式2: **公网地址(万维网使用)**, **私有地址(局域网使用)**



### 3.2 port
620

端口号标识正在计算机上运行的进程(程序), 

+ 不同的进程有不同的端口号 (同一host上两个进程用一个port number会造成port conflict), 被规定为一个 16 位的整数 0~65535。

端口分类:
+ **公认端口**: 0~1023。被预先定义的服务通信占用(如:HTTP占用端口 80，FTP占用端口21，Telnet占用端口23)
+ **注册端口**: 1024~49151。分配给用户进程或应用程序。(如:Tomcat占 用端口8080，MySQL占用端口3306，Oracle占用端口1521等)。
+ **动态/私有端口:** 49152~65535。



端口号与IP地址的组合得出一个网络套接字: **Socket**



## 4. 通信要素2: protocol

621

TCP/IP 协议簇: 实用角度 physical layer  -->  data link layer --> Network Layer --> transport layer --> application layer

其中Transport layer 的两种重要protocol:

+ TCP: 可靠
  + 使用TCP协议前, 必须先建立TCP connect, 形成数据传输通道
  + TCP connect的建立: **3-way handshake**, reliable for point-to-point communication
  + TCP协议进行通信的两个应用进程: 客户端(client side), 服务端(server side)
  + 在连接中可进行大数据量的传输
  + 传输完毕, 需要release connect, 效率低 
    + Release connection: **四次挥手**
      + 一般由客户端发起四次挥手的第一次挥手
+ UDP: 快
  + 将数据, source, destnation封装成数据包, no need for connection
  + 每个数据包的大小限制在64k内
  + 发送不管对方是否准备好, 接收方收到也不会确认, not reliable
  + 可以broadcasting
  + 发送数据结束时无需释放资源, cheap & fast



# Part2. 网络编程

## 5. TCP网络编程

622-625

:gem: Demo1: client side send a message to server side, server side show the message



:gem: Demo2: 客户端发送文件给服务端, 服务端将文件保存在本地

至少需要4个stream:

Client side:

+ socket的OutputStream
+ 本地的InputStream

Server side:

+ socket的InputStream
+ 本地的OutputStream



Client > -------socket------- < Server

​	:arrow_up:						 				:arrow_down:

​    file						 				file



:gem: Demo3:  从客户端发送文件给服务端, 服务端保存到本地, 并返回"发送成功"给客户端, 并关闭相应的连接

+ 阻塞式方法





## 6. UDP网络编程

626

该看这个了






## 7. URL编程

627-628



# Revision

之后刷Java Web