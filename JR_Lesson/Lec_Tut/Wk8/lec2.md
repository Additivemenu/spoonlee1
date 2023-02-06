1-25 龙哥react 1

3-5年工作经验要求招entry level大概率是为了吓退没有底子的人, 真要3-5年工作经验都mid到senior啦

---
19:47-

回顾
+ Readable, Maintainable, Reusable
+ SOLID
  + Single Responsibility
  + Open Close
  + Dependency Inversion


ES5 -> ES6 JavaScript历史

IT的知识迭代太快了
前端的知识迭代太太太快了

前端一直在解决用户的无理需求和程序员之间配合困难



---
React


# 2. 为什么学React
React让你尽量用少量的JS做更复杂的工作

龙哥提醒，首先写代码的时候，要human-being的方式思考一下，出了什么问题，使用该技术解决了什么问题。

## 2.1 以史为镜，可以知得失，React的发展史
只有（写HTML）难受了，才能去想到学习React
历史时间线： AngularJS -> React -> Angular -> VUE jQuery -> AngularJS -> React/ Angular -> VUE

React的出现，倒逼AngularJS重写回了Angular


## 2.2 React的好处，与Angular的对比
React到底好在哪里
+ VS Angular：One framework Mobile & Desktop
Angular可以做前端的所有事情
framework是架构是平台，是everything，学了Angular，从开发到部署到上线，前端，都会了。大而全，涵盖了前端所有东西。但是违反了solid中的单一职责
+ React: A JavaScript Library for building user interface
只能做一件事情：UI
JavaScript Library
Only User interface, 只替代了Style相关的html，动态的html


# 3. React 三大特性 20:19-
React 三大特性 (react官网挂的就是这些)
+ Declarative(声明式)
+ Component-Based (组件化)
+ Learn Once, Write Anywhere

## 3.1 Feature1: Declarative 20:22-
3.1 Declarative 声明式
做UI时，React让我们只用声明式去设计UI，再去控制内部状态的改变，UI就会根据状态的改变而改变。

painless
design
efficiently update and render when data change
more predictable and easier to debug

### Imperative

Imperative 命令式
现实世界中，我们⼤部分编码都是命令式的，例如
```js
document.querySelector('#resume-page').classList.add('page--active');
```
命令DOM更新，命令document去找东西，命令更新classlist

### Declarative
Declarative 声明式
例如 SQL，我们声明数据库，告诉数据库要什么，然后数据库就会给你对应的数据，⽽不是通过数据库的 API去取
```sql
// 选择name为Alipay的前10个产品
SELECT * FROM Products WHERE name='Alipay' LIMIT 10;
```



```js
// 命令DB找到Products table里的产品, 命令DB筛选产品名为Alipay的前10个结果
DB.findTable('Products').findRows().filter({name: 'Alipay'}).find(0,10)
```

### 命令式 VS 声明式 20:27-

Imperative: 过程导向, 需要知道每一步的过程, 结果是啥不管; 比如中国的中学生, 每一步要干啥被安排的明明白白的, 最后结果如何难知道
Declarative: 不在乎过程, 只是声明结果. 比如研究生, 老板给课题, 学生自己推进, 老板只要结果不需要关心过程

二者背后是两种哲学思想: 专制vs.民主, 过程vs.结果

---

⼀家命令式餐馆，从客⼈进⼊店开始
1. ⽼板告诉（命令）客⼈坐在 N 号桌。
2. 客⼈向⽼板点餐 「交互」。
3. ⽼板告诉（命令）后厨做⼏道什么样的菜。
4. ⽼板告诉（命令）厨师放什么原材料，多少调料，⼏成熟。
5. ⽼板找到一个空闲的程序员, 告诉(命令)服务员上菜。

5步里3步是命令，例如传统fish&chips。 老板作为发号施令的人，必不可少。必须有一个核心的(老板)存在

---

⼀家声明式餐馆，从客⼈进⼊店开始
1. 当 Waiting Zone 有客⼈时，服务员A带客⼈⼊座。
2. 当客⼈⼊座服务员B管理区域时，服务员B点单。
3. 当客⼈点好单，服务员B讲单据送到后厨。
4. 当后厨看到新的单据时，根据单据做菜。
5. 当服务员C看到 Pick Up 区有菜品时，根据单据上菜。

没有一个人发号施令，却每个人都有条不紊的进行工作，例如麦当劳 


## Feature2: Component Based 20:46-
⽹⻚程序在业务发展的过程中体积越来越庞⼤，其中堆叠了⼤量的业务逻辑代码，不同业务模块的代码相互调⽤，相互嵌套，代码之间的耦合性越来越⾼，调⽤逻辑会越来越混乱。当某个模块需要升级的时候，改动代码的时候往往会有牵⼀发⽽动全身的感觉。特别是多⼈合作的情况下，代码的维护会让⼈奔溃.


模块化举例
+ 宜家家具：家具被划分成⽆数个⼩零件（Component），不同家具的⼩零件（Component）因为规格相同可以互相使⽤，安装⽅便
+ 乐⾼：相同规格的积⽊（Component）通过不同的组合⽅式组成不同的产品。
+ ⼤型⼯程：京港澳跨海⼤桥。由⼤桥，引道组成。⼤桥由桥⾯，桥墩，...。整体桥⾯由多个⼩桥⾯组成。每个⼩桥⾯由...组成，每个...由...组成，这种每个⼩产品（Component）由分布在各地不同的⼯⼚⽣产，最⼤化效率。 


模块化有什么好处
+ Single Responsibility
+ Open Close
+ 就近维护，⾯向功能（责任）


## Feature3: Learn Once, Write Anywhere

即cross platform

学会了React，你就什么都会了，比如
Server Side Rendering (SSR)
Mobile: React Native (RN)
Website: React DOM (HTML Web)
VR: React VR (VR)
TV: React TV (TV) React IOT (IOT)



# 4. :moon: React hands-on  1h26min-

真正开始react

## 4.1 快速搭建react环境: create-react-app 1h26min-

- Webpack / bundle
- Babel / compile



JS vs. nodejs

JavaScript无法在*非浏览器环境*跑, JS不是系统层面的语言, 没有办法操作文件
- **nodejs**: 是js在系统层面的执行逻辑， 使得我们可以在系统层面(比如terminal里)写JS, 在系统层面操作文件
- **npm**: node package manager, 用来管理nodejs相关的依赖



用nvm装node



几个terminal命令:

- `node`: terminal输入node, terminal将进入nodejs的编写环境 (terminal输入.exit推出) (:cry:谁会这么用...)

  - ```bash
    fs.readdirSync('.')	// 读取当前路径下文件
    ```

- `npm`: 下载好node自带,  用来安装和卸载dependency

- `npx`:  npm的script执行器

  - `npx create-react-app project-one-react`在当前路径下快速create react app
  - `npx create-react-app -h`: helping menu

reading: [npm vs. npx](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/)





## 4.2 package.json配置文件 1h45min-

创建好react app后, 我们来看里面的配置文件

node_modules文件夹下是各种dependency, 相当于IDEA的external library



注意react里安装dependency

+ 方式1: `npm instal <package-you-want>` terminal里打, 之后可以直接运行,  但该依赖不会在package.json显示
+ 方式2: 在package.json里直接写dependency没有用, 写了之后还是得在命令行里打`npm instal <package-you-want>`; 这样最好, 因为你需要记录下需要哪些依赖

```json
{
  "name": "project-one-react",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",									// react 基本语法
    "react-dom": "^18.2.0",							// 允许react语法跑在browser上的包
    "react-scripts": "5.0.1",						// 允许我们start app
    "web-vitals": "^2.1.4"
  },
  "scripts": {													// "描述项目需要的命令行命令": "同时触发要跑的依赖包名" 
    "start": "react-scripts start",			// e.g. `npm run start`
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"			// 
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {										// project compatability declaration
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```



先配置文件里的讲browserlist

js泡在浏览器里, js的方法需要浏览器支持才行(e.g. forEach()) 不同的浏览器可能不支持同一个js方法





## 4.3 跑react 2h15min-

在刚刚用`npx create-react-app project-one-react`创建的react project路径下, 跑`npm run start`运行你的第一个react程序



react启动原理

+ entry program: public > index.html

+ js entry program: src > index.js: 里面捕捉index.html的dom对象, 然后通过render()方法来渲染一段html代码; 实现组件化

```js
import App from './App';               // !! 指向同路径下的App.js !! 实现模块化

const root = ReactDOM.createRoot(document.getElementById('root'));    // 之后react写成的网页元素都会塞到这个html元素里

// what we are going to render
root.render(
  <React.StrictMode>
    <App />     
  </React.StrictMode>
);  // !! <App /> return a piece of html code!!
```





## 4.4 :moon: jsx操作 2h29min-

React允许我们在js里写html Like的代码, 实现组件化

+ 一个js function return一段html代码, 作为一个component
+ component可以在其他html片段中通过tag的方式调用

:gem: index.js里:

:bangbang: 注意下面用来产生component代码的函数名必须首字母大写, 这是为了和普通js函数做区分

```react
// 函数名首字母大写
const App = () =>{
  return(
  	<div>
    	<Header></Header>
      <Body></Body>    
      <Footer></Footer>
    </div>
  )
}

// 函数名首字母大写
const Header = () => {
  return(
  	<div>
    		<div>Logo</logo>
      	<div>Nav</div>
    </div>
  )
}

// 函数名首字母大写
const Body = () => {
  return(
  	<div>Hello world</div>
  )
}

// 函数名首字母大写
const Footer = () => {
  return(
  	<div>Made with love by xueshuo</div>
  )
}

// 先声明再调用
const root = ReactDOM.createRoot(document.getElementById('root'));    // 之后react写成的网页元素都会塞到这个html元素里
root.render(<App></App>)
```



---

进一步地, 下面的component函数其实可以放到别的js文件里实现组件化

index.js

```react
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';               // !! 指向同路径下的App.js !!


const root = ReactDOM.createRoot(document.getElementById('root'));    // 之后react写成的网页元素都会塞到这个html元素里
root.render(<App></App>)
```



App.js

```react
import Header from './Header'
import Body from './Body'
import Footer from './Footer'

// 函数名首字母大写
const App = () =>{
  return(
  	<div>
    	<Header></Header>
      <Body></Body>    
      <Footer></Footer>
    </div>
  )
}

export default App
```



Header.js

```react
// 函数名首字母大写
const Header = () => {
  return(
  	<div>
    		<div>Logo</logo>
      	<div>Nav</div>
    </div>
  )
}

export default Header
```



Body.js

```react
// 函数名首字母大写
const Body = () => {
  return(
  	<div>Hello world</div>
  )
}

export default Body
```



Footer.js

```react
// 函数名首字母大写
const Footer = () => {
  return(
  	<div>Made with love by xueshuo</div>
  )
}

export default Footer
```

