+ 聚合了两个servant class到client side
  + say hello
  + calculator
+ 同时提供GUI界面

进一步说明 Java RMI对于建立distributed system的便利
+ server只需要register service, 同时关心多线程同步问题
+ client只需要通过registry直接调用server提供的service即可