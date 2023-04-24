C4 React State & working with events



continue with class3 react  project



## Summary

+ handling event
+ update the UI & working with 'state'
+ closer loo at components & state



注: 代码还是继续在class3 的基础上写



## Intro 

### :moon: Lisening to Events & working with Evenet Handler

46

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button



:book: [MDN: 各种event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)

add event listener to a react element

```js
// on + EventName 
<button onXxxx = {()=>{}} ></button>
```



how react component function works

47

react component function is just a special JS function that returns JSX 



:bangbang: 如果使用如下的代码, click button 改变 title 并没有显示在页面上, 因为页面只在开始时render了1次.  我们需要的是, 当title这个变量改变时, 它所属的component function run again (re-render) ---> rect state

```js

function ExpenseItem(props) {

  let title = props.title;		// 普通JS变量表示, 即使被改变了, 页面也不会re-render
  
  const clickHandler = () => {
    title = 'Update!';
    console.log(title);
  }

  return (
    <Card className="expense-item">

      <ExpenseDate date={props.date} />

      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      
      <button onClick={clickHandler}  >change title</button>  

    </Card>
  );
}
```





![UI1](./Src_md/UI1.png)



### :moon: working with "state"

48



react hook: `useState()`

```js
// useState()返回一个array, 用array destructing 来更方便接取其返回. 
// arg1: current state value 
// arg2: setter for the state
const  [title, setTitle] = useState(props.title);
```

+ can only be used within react component function
+ 将state 理解为react 封装的一种特殊的变量, 当state的value改变时, it will trigger re-render of the functional component that It belongs to. (react will re-exe the component function)



现在点击click, 页面就可以正常显示"state"的改变了

```js
import React, {useState} from 'react';

function ExpenseItem(props) {

  // react state
  const  [title, setTitle] = useState(props.title);		// 第一次执行时, react 会初始化title 这个state的值为props.title. 如果是re-render时再次执行ExpenseItem()这个函数, react则不会执行初始化这个操作

  const clickHandler = () => {
    setTitle("Update!");    // not just set value for title, also triggers re-render when title is changed
    console.log(title);
  }

  return (
    <Card className="expense-item">

      <ExpenseDate date={props.date} />

      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      
      <button onClick={clickHandler}  >change title</button>  

    </Card>
  );
}
```



### Closer look at "useState" hook

49-

```react
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
```

我们在Expenses这个类里定义了4个Expenses, 并将一个array的元素分别作为props传了进去. 

需要注意的是state is seperated on per-component based. The state we define for each `ExpenseItem` is independent to each other. 当我们点击其中一个ExpenseItem的change title button时， 只是改变那一个ExpenseItem的state, 其他的ExpenseItem的state不受改变, 也就实现了不用全局re-render, 只需要re-render特定的局部component, 实现高性能



> State can be updated in many ways!
>
> Thus far, we update our state **upon user events** (e.g. upon a click).
>
> That's very common but not required for state updates! **You can update states for whatever reason you may have**.
>
> Later in the course, we'll see Http requests that complete (where we then want to update the state based on the Http response we got back) but you could also be updating state because a timer (set with `setTimeout()`) expired for example.



# more hands-on

## Adding form inputs

51

添加新的form component, 允许user input 新的expense 创建新的expense item组件

css file就不展示在这儿了

```react
import "./ExpenseForm.css";

const ExpenseForm = () => {
  return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" />
        </div>

        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" min="0.01" step="0.01" />
        </div>

        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" min="2019-01-01" max="2022-12-31" />
        </div>
      </div>

      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};
```

```react
import ExpenseForm from './ExpenseForm';

const NewExpense = () => {

    return (
        <div className="new-expense">
            <ExpenseForm/>
        </div>
    )
};
```

```react
function App() {
  const expenses = [
		...
  ];

  return (
    <div className="App">
      <NewExpense/>
      <Expenses expenses = {expenses}></Expenses>
    </div>
  );
```



## :moon: Listening to user input

52

在ExpenseForm中添加event listener

in vanillia JS, we use imperative approach to add event listener to a specific element:

```js
document.getElementById('').addEventListener('click', (event) => {...})
```



But in react, we could do this in a more declarative way:

titleChangeHandler: 可以打印出event obj 来看看它的结构

```react
const ExpenseForm = () => {

  const titleChangeHandler = (event) => {
    console.log(event.target.value);		// event.target.value holds the value of the input at the point the event occurs 
  }

  return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler}/>	
        </div>

        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" min="0.01" step="0.01" />
        </div>

        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" min="2019-01-01" max="2022-12-31" />
        </div>
      </div>

      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};
```



## Working with multiple states

53

看到这里
