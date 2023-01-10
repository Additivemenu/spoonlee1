跳转

[尚硅谷: 网络编程](./GuiguShang/GuiguShang.md)

---

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



# 2. 网络通信要素概述

IP address: `InetAddress`
+ uniquely identify a host on the internet
+ 本地回环地址(hostAddress): 127.0.0.1  主机名(hostName): localHost
+ IP地址分类方式1: **IPV4**, **IPV6**
  + IPV4: 4 bytes, 4个0-255. 以点分十进制表示. 2011年初已用尽.
    + e.g. 192.168.0.1
  + IPV6: 16 bytes, 写成8个无符号整数, 每个整数用4个hexdeciaml number表示. 整数之间用':'分隔 
    + e.g. 3ffe:3201:1401:1280:c8ff:fe4d:db39:1984
+ IP地址分类方式2: **公网地址(万维网使用)**, **私有地址(局域网使用)**




# 3. 通信要素1: IP, port
IP:



port: 620



# 4. 通信要素2: protocol




# 5. TCP网络编程


# 6. UDP网络编程


# 7. URL编程