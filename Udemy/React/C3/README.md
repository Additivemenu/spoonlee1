3 React Basics & Working with Components





## Summary

40-

+ react component: in the form of JS function
+ message passing in react component: props. The argument to the functional component
  + commom component
  + wrapper component



## 1. Intro 

### What are components 

25,26

React makes building complex, interactive and reactive UI simpler

React is all about "components"  - reusable (better to be reusable) building blocks (HTML + CSS + JS in one compoent) of user interface. Core ideas behind `组件化` are: 1) Reusability; 2) Separation of concerns, which are basic ideas across all programming lanuage



React: declarative approach - define the desired target state(s) and let React figure out the actual JS DOM instructions. 体现封装性



### Creating a new React Project

27-29

use some tools like create-react-app to build a react project

https://github.com/facebook/create-react-app

which need node js

https://nodejs.org/en



### Project structure

```js
my-app
├── README.md
├── node_modules			// don't edit, holding all dependency files. If no show, run `npm install`
├── package.json			// all dependencies here, the configuration file. `npm install` to install dependency packages needed
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html		// the only html file since we are using react to define single page application
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js					// root component
    ├── App.test.js
    ├── index.css
    ├── index.js				// entry to all components
    ├── logo.svg
    └── serviceWorker.js
    └── setupTests.js
```



Index.js: 上接index.html, 下接root component `<App/>`

"with react, you build a <u>component tree</u> with one root component that's mounted into a DOM node"

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));	// bound to root node in index.html
root.render(<App />);		// jsx

```

use `import` and `export ` to connect different components





### JSX 

30,31

JSX for Javascript XML , 相当于React的一个语法糖



Offers easier way to manipulate DOM element in a declarative manner, instead of imperative way like vallina JS

```js
function App() {
  return (
    <div>
      <h2>Let's get started!</h2>
    </div>
  );
}

export default App;
```



## 2. Hands-on

Build first custom component

32-



函数式组件: in react, a component is just a special JS function

组件文件的名字必须大写开头!



Write more complex JSX code

33-

Preferences > keyboard shortcut > format document

或者 control + s to save file



Add css

34-

```js
import "./xxx.css"

<div className="expense-item">
  
</div>
```



### :moon: Output dynamic data in JSX

35-

```js
use {} to bracket variable in JSX
```



```js
function ExpenseItem() {

  const expenseDate = new Date(2021, 2, 28);
  const expenseTitle = 'Car Insurance';
  const expenseAmount = 294.67;

  return (
    <div className="expense-item">
      <div>{expenseDate.toISOString()}</div>
      <div className = "expense-item__description">
        <h2>{expenseTitle}</h2>
        <div className = "expense-item__price">${expenseAmount}</div>
      </div>
    </div>
  );
}
```



### :full_moon: message passing via "props"

36-

props 从parent向child components传递信息

```js
// App 
function App() {
  // 体现数据和代码分离
  const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ];

  return (
    <div className="App">
      <h2>Let's get started!</h2>
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        data={expenses[0].date}
      />
      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        data={expenses[1].date}
      />
      <ExpenseItem
        title={expenses[2].title}
        amount={expenses[2].amount}
        data={expenses[2].date}
      />
      <ExpenseItem
        title={expenses[3].title}
        amount={expenses[3].amount}
        data={expenses[3].date}
      />
    </div>
  );
}


function ExpenseItem(props) {
	
  return (
    <div className="expense-item">
      <div>{props.data.toISOString()}</div>
      <div className = "expense-item__description">
        <h2>{props.title}</h2>
        <div className = "expense-item__price">${props.amount}</div>
      </div>
    </div>
  );
}

```



Adding "normal" JS logic to components

37-



https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString

就用了下date的API, 转换了下格式

```java
function ExpenseItem(props) {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className="expense-item">
      <div>
        <div>{month}</div>
        <div>{year}</div>
        <div>{day}</div>
      </div>

      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </div>
  );
}
```





spiltting components into multiple components

38-

将原本bloated 的 components, 拆解成更多的components

```js
// 
function ExpenseItem(props) {

  return (
    <div className="expense-item">
      // 继续向下传递props 
      <ExpenseDate date = {props.date}/>    

      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </div>
  );
}

// 
function ExpenseDate(props) {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className = "expense-date">
      <div className = "expense-date__month">{month}</div>
      <div className = "expense-date__year">{year}</div>
      <div className = "expense-date__day">{day}</div>
    </div>
  );
}
```



### :moon: The concept of "Composition" 

39-

Composition: building larger components from smaller components

Two types of components: 

+ the normal component 

+ the wrapper component (props.children)



定义好container的样式, 然后复用到其他的component

```css
.card{
    border-radius: 12px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25)
}
```



````js
// 使用wrapper component来包裹其他的普通component
function card(props){  // props 指的是 <Card /> 本身的 props

    const classes = 'card ' + props.className;		// 秒! 

    return (
        <div className = {classes} >{props.children}</div>
    )
}


// 使用wrapper component 
function Expenses(props) {
  const expenses = props.expenses;

  return (
    <Card className="expenses">
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      />
      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}
      />
      <ExpenseItem
        title={expenses[2].title}
        amount={expenses[2].amount}
        date={expenses[2].date}
      />
      <ExpenseItem
        title={expenses[3].title}
        amount={expenses[3].amount}
        date={expenses[3].date}
      />
    </Card>
  );
}

// 使用wrapper component
function ExpenseItem(props) {
  return (
    <Card className="expense-item">

      <ExpenseDate date={props.date} />

      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      
    </Card>
  );
}

function ExpenseDate(props) {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className = "expense-date">
      <div className = "expense-date__month">{month}</div>
      <div className = "expense-date__year">{year}</div>
      <div className = "expense-date__day">{day}</div>
    </div>
  );
}
````



## 3. Alternatives

### Closer look at JSX

41

JSX只是 React.creatElement() 的syntactic sugar



```js
function App() {
  const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ];

  // return (
  //   <div className="App">
  //     <h2>Let's get started!</h2>
  //     <Expense expenses = {expenses}></Expense>
  //   </div>
  // );
	
  // equivalent to above
  return React.createElement(
    "div",		// 标签名
    {},				// 标签的配置
    React.createElement("h2", {}, "let's get started"),		// 标签的内容
    React.createElement(Expenses, { expenses: expenses })
  );
}
```



### Project structure

42

just create the project struture suit your need, don't put everything in a single folder





### An alternative function syntax

43

```js
// standard function
function App(){
  
}

// arrow function
const App = () => {
  
}
```



