contents

- [Lecture 01 Introduction \& Web Tech](#lecture-01-introduction--web-tech)
      - [1.1 Intro to Web \& Network Technology](#11-intro-to-web--network-technology)
    - [1.2 Chrome浏览器：](#12-chrome浏览器)
      - [1.2.1 ```Console```](#121-console)
      - [1.2.2 ```Network```](#122-network)
      - [1.2.3 ```Source```](#123-source)
      - [1.2.4 ```Application```](#124-application)
      - [1.2.5 ```Performance```](#125-performance)
      - [1.2.6 ```Coverage```](#126-coverage)
      - [1.2.7 ```Security```](#127-security)
      - [1.2.8 ```Lighthouse```](#128-lighthouse)
      - [1.2.9 web application和website的区别](#129-web-application和website的区别)
    - [1.3 Single Page Application：](#13-single-page-application)



---
Lecture 01 Introduction & Web Tech

## 1.1 Intro to Web & Network Technology
- What's Internet: https://youtu.be/Dxcc6ycZ73M
- Domain Name System，根服务器在美国，十三个服务器在各个州
- 买域名：AWS，阿里云（.com .net .org顶级域名）e.g. 如何买域名：在AWS上搜Route53，点Registered domains和Hosted zones
- 本电脑的public address：ipconfig 或者 google查what is my ip address,可以用来从外网访问自己的网站，进行debug（192和10开头都是private address）
- 打开一个网站时会经历什么？ping输入的地址，请求DNS拿到ip地址，访问到对应网站的server，获取数据
- DDoS Attack：一千万台机器执行ping命令，使被攻击网站的资源耗尽
- IPv4和IPv6地址Header区别：IPv6地址栏更大，包的量更少
- IPv4地址范围：
 ![Screenshot](./Src/IPV4.png)
- HTTP 1.1 请求会发三个请求每个请求发一个文件， HTTP/2请求一次性会发三个文件
- 地址栏左边有个锁的，是安全性网站，使用https的，client和website之间的隧道是加密的，have SSL
- 如何让自己的网站变成https：certbot
## 1.2 Chrome浏览器：
鼠标操作：
	
	- 右键点击inspect
	- 三个点点开可以调整视图
	- esc键打开console
	- 鼠标点击模式，可以随意更改对应页面元素的html和css
	- 手机模式，可以选择不同的手机，手机端看没有hover效果 ***注意写网站时，最低宽度320***

### 1.2.1 ```Console```
-  Console部分，可以直接在console里写js代码
### 1.2.2 ```Network```
- Network部分，Protocol下面有http1.1和http2，google有http3，匠人已经大部分使用h2协议了，```Fetch/XHR``` 可以筛出来，具体的包的文件，在Header下面，可以看到很多包的信息，如RequestURL等，其中new relic是一个系统网站分析工具，xaccesstoken表示一个指令，一个加密的钥匙，凭借这个码去请求远程端的资源，类似拿外卖验证身份的工具，preview下面是格式化后的数据包，Response是json格式的数据包，一个网站的数据是通过ping API请求远程端的数据然后放在网站上，Payload（只有PUT method有）下面是头文件里更新的内容，传到后端去后，后端会给response，fast3G/slow3G/offline拿来模拟网速，用来测试移动端没信号的时候（在偏远地方，工地上），做app的offline测试
### 1.2.3 ```Source```
- Source部分，可以加断点，刷新时，页面在载入过程中，会断在断点位置
### 1.2.4 ```Application```
- Application部分，Local storage 8 MB ，Session storage 16MB，local storage 会一直储存在里面，session storage 一个session结束就clear了，当复制网址进行new tab时，session storage是不共享的，local storage在同一个浏览器下面会共享的，如用session storage，登陆账号后重新打开新的页面，会变成访客模式。如果前端数据可以任意修改，那么会有不安全的风险，必须要有后端校验，因此写代码时，要思考好哪些东西放前端，那些地方放后端
### 1.2.5 ```Performance```
- Performance部分，***PageSpeed Insights***  在开发网站时，用的元素越多，用的js越大，加载越慢
### 1.2.6 ```Coverage```
- Coverage部分，可以看出有百分之多少的代码没有用，可以用来进行网页优化，问题Image elements do not have explicit `width` and `height`，图片实际的高宽比和渲染后的高宽比不同，解决方法是用js获取页面宽度，放进lambda处理好对应size的图片
### 1.2.7 ```Security``` 
- Security部分，若页面不是https，Security里会告诉你哪些东西是不安全的
### 1.2.8 ```Lighthouse``` 
- Lighthouse部分，测试和PageSpeed Insights一模一样，可以用于本地测试

### 1.2.9 web application和website的区别
web application和website的区别，点击View Page Source，可以看到原始代码，web app大部分是js，切换时没有任何的加载，全部在一个页面里，website切换时，会切换不同的路由，切换不同的页面，web application也叫single page application

## 1.3 Single Page Application：
- 用React做的页面，切换页面不需要刷新，会隐藏URL的Fragment部分
 ![Screenshot](./Src/web_application_architecture.png)
- Safari technology preview IOS设备debug
- Genymotion 安卓设备debug
- BrowserStack 多种设备debug 要花钱（但一般情况下公司会帮忙买）
