C4 React State & working with events



continue with class3 react  project



# Summary

+ Handling event
  + add event listener to an element

+ Update the UI & working with 'state'
  + why using 'state' instead of JS variable
    + React state updates (e.g.invoke setState()) are <u>*asynchronous*</u>, meaning they do not happen immediately but are scheduled to happen at the next render cycle. 
  
  + State management
  
  + component communication
    + state lifting
      + types of components: stateless vs. stateful




注: 代码还是继续在class3 的基础上写



# 1. Intro 

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



# 2. more hands-on

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
document.getElementById('...').addEventListener('click', (event) => {...})
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



# 3. State management

## 3.1 Working with multiple states

53

```react
const ExpenseForm = () => {
  // 定义多个state分别来hold entered value
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  const titleChangeHandler = (event) => {
    // console.log(event.target.value);
    setEnteredTitle(event.target.value);
  }

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  }

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
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
          <input type="number" min="0.01" step="0.01" onChange={amountChangeHandler} />
        </div>

        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" min="2019-01-01" max="2022-12-31" onChange={dateChangeHandler}/>
        </div>
      </div>

      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};
```





## 3.2 Using One state instead (Better)

54

平行于'working with multiple states'的一种写法, 将所有entered value放到一个object state里统一管理

+ 注意`setUserInput()`是对整个object进行set value, 所以必须要写`...userInput`， 把previous的object state先copy过来, 再覆盖对应的object state的attribute. 如果不写`...userInput`, 那么其他的attribute就会丢失

```react
const ExpenseForm = () => {

  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate:''
  })

  const titleChangeHandler = (event) => {
    setUserInput({
      ...userInput,             // need to keep other attribute as it is or they will be rejected if you don't use spread operator
      enteredTitle: event.target.value
    });
  }

  const amountChangeHandler = (event) => {
    setUserInput({
      ...userInput,             // need to keep other attribute as it is or they will be rejected if you don't use spread operator
      enteredAmount: event.target.value
    });
  }

  const dateChangeHandler = (event) => {
    setUserInput({
      ...userInput,             // need to keep other attribute as it is or they will be rejected if you don't use spread operator
      enteredDate: event.target.value
    });
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
          <input type="number" min="0.01" step="0.01" onChange={amountChangeHandler} />
        </div>

        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" min="2019-01-01" max="2022-12-31" onChange={dateChangeHandler}/>
        </div>
      </div>

      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};
```







## 3.3 :bangbang: Update state that depends on the previous state

55

接上面, react 还提供如下的写法, 来确保`prevState`确实是most recent state 的snapshoot, 更加安全. 

如果你需要update state that depends on the previous state, 确保用这种写法

```react
const titleChangeHandler = (event) => {
   
    // setUserInput({
    //   ...userInput,             // need to keep other attribute as it is or they will be rejected if you don't use spread operator
    //   enteredTitle: event.target.value
    // });

    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    });
};
```





---

detailed explaination by chatGPT:

It depends on the specific use case and the requirements of your application. However, in general, using the functional update form is considered more reliable, especially when the new state depends on the previous state. Here's a brief comparison of the two methods:

1. Direct state update:

```react
setUserInput({
  ...userInput,             
  enteredTitle: event.target.value
});
```

This approach is suitable when the new state does not depend on the previous state. It is a simpler and more straightforward method of updating the state. <u>However, when multiple state updates are performed in quick succession, it might lead to unexpected behavior, as React may batch multiple state updates together for performance reasons.</u>

2. Functional update:

```react
setUserInput((prevState) => {
  return { ...prevState, enteredTitle: event.target.value };
});
```

This approach is better when the new state depends on the previous state. <u>By using a functional update, you ensure that the state updates are correctly handled even when multiple state updates are performed in quick succession. React guarantees that the `prevState` will always be the most recent state when using this method, which helps to avoid any synchronization issues.</u>

In summary, 

+ if the new state depends on the previous state or if you want to ensure that the state updates are correctly handled even in situations where multiple state updates may occur, using the functional update method is recommended. 
+ However, if the new state does not depend on the previous state and you don't expect multiple state updates to happen, using the direct state update method is also acceptable.



来看具体的例子:

```react
import React, { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);

  const incrementHandler = () => {
    setCounter(counter + 1);
    setCounter(counter + 1);
  };

  const resetHandler = () => {
    setCounter(0);
  };

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={incrementHandler}>Increment x2</button>
      <button onClick={resetHandler}>Reset</button>
    </div>
  );
}

export default Counter;

```

In the `incrementHandler` function, we're calling `setCounter` twice in a row to increment the counter by 2. <u>However, due to React's batching mechanism, both `setCounter` calls will receive the same value for `counter`, which will result in the counter being incremented by only 1 instead of 2.</u>

To fix this issue and ensure that the state updates are correctly handled, you can use the functional update form:

```react
const incrementHandler = () => {
  setCounter((prevCounter) => prevCounter + 1);
  setCounter((prevCounter) => prevCounter + 1);
};
```

In this version, React guarantees that the `prevCounter` value will be the most recent state when executing the function, even when multiple state updates are performed in quick succession. This approach ensures that the counter is incremented by 2, as intended.





## 3.4 :bangbang: Handling form submission

56, 57

这里我们还是沿用multiple state的写法

实现点击submit button, 就提交form里的内容的功能

+ 注意此时的event listener是加在<Form/>上
+ submitHandler(event){}中, 需要先disable browser对 event default behaviour: sumbit 时会刷新页面
+ :bangbang: 注意input field里直接接收到的都是String类型

同时, 点击submit button之后, reset the input field to empty ---> two way binding

+ 利用<input>的value属性, 将state 与 <input>绑定
+ 之所以叫two-way binding, 是因为对于<input>我们现在不仅仅是通过onChange的event listener来监听事件改变state的值， 我们还把state的值又传回了<input> 来改变<input>的value property, 也就是在页面上的<input>中实时显示这个对应state的值

```react
const ExpenseForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
      event.preventDefault();   // vanilla javascript, not react. The default is that the web page will reload, 
      // because the browser will send a request to the server that hold this webpage on a submit event
      // but this is not what we want, so we just disable its default behaviour

      const expenseData = {
        title: enteredTitle,
        amount: enteredAmount,
        data: new Date(enteredDate)   // convert string to a Date object
      }

      console.log(expenseData);
    
    	// reset the input field to empty after submit
      setEnteredTitle('');
      setEnteredAmount('');
      setEnteredDate('');
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input 
            type="text" 
            value={enteredTitle} 
            onChange={titleChangeHandler} 
          />
        </div>

        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>

        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>

      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};
```





# 4. :bangbang: Component communication

:bangbang: 难点和重点!



## :full_moon: Child-to-parent Component communication

58

前面我们学了, 通过props可以在parent component中, 将信息传递到其child components中, 

now we want to pass the data we collected in ExpenseForm to its parent component NewExpense,  核心的做法是, 在parent component中定义一个以child component的某个state信息为argument的 function, 然后将这个function通过props传递给child component, 然后在child component里调用这个function

```js
App.js
	|
  NewExpense.js
				| 
  		ExpenseForm.js
```



在NewExpense.js中定义一个function, 并将通过props传递给其child component 

```react
const NewExpense = () => {
  // we will pass this function to child component
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    console.log(expenseData);

  };

  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
};
```

在child component中, 调用刚刚parent component传递过来的function

```react
const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault(); // vanilla javascript, not react. The default is that the web page will reload,
    // because the browser will send a request to the server that hold this webpage on a submit event
    // but this is not what we want, so we just disable its default behaviour

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      data: new Date(enteredDate), // convert string to a Date object
    };

    props.onSaveExpenseData(expenseData);  // 从parent component那里传来的function
    
    // reset the input field to empty after submit
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
				...
    </form>
  );
};
```

这样, parent component就知道, 并且可以操作child component里的信息, 我们在expenseData这个object中添加了一个新的属性: id



类似的, 我们还可以将NewExpense里的信息传给App.js



## :full_moon: Lifting the state up

59

```js
// 当前我们的component hierarchy
App 
 |
  - NewExpense:  Data / State is generated here (provider)
 |
  - Expenses: Data / State is needed here (consumer)

// problems is: how to move the data generated from the provider to the consumer? 
// solution: data sharing between brothers via state lifting to the closest anscester component of provider and consumer component
```





### :gem: 作业练习

Adding ExpensesFilter Component under Expenses component

```js
App 
 |
  - NewExpense:  Data / State is generated here (provider)
 |
  - Expenses: Data / State is needed here (consumer)
       | 
        - ExpensesFilter
			 |
        - ExpenseItem
```

Practice: 

+ add event listener to capture data in ExpensesFilter (provider component)
+ passing state from child to parent (state lifting)
+ two way binding: value property 



ExpensesFilter.js

+ 为<select/> add envent listener, 并在envent handler里调用parent传来的function以使得parent知晓自己的信息

```react
const ExpensesFilter = (props) => {

  const dropdownChangeHandler = (event) => {
    event.preventDefault();
    props.onChangeFilter(event.target.value);
  }

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>

        <select value={props.selectedYear} onChange={dropdownChangeHandler}>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
      </div>
    </div>
  );
};
```



Expenses.js

+ 定义好filterChangeHandler这个function并将其传递给child , 以向child component索取信息
+ two way binding: 将filteredYear这个state传递给child, 好让其能显示这个state的值
  + 总体来看, filteredYear这个state是在Expenses中被修改值, 但是调用是在ExpensesFilter里
  + ExpensesFilter里并没有filteredYear这个状态, 为了让其能够显示这个状态的值， 需要再将这个state传递给ExpensesFilter, 在它里面用value 这个property来display

>  :question: 为啥不直接把filteredYear和setFilteredYear都作为props传递给<ExpensesFilter/>呢？ 龙哥是这么讲的, 而且上面说的也是实现相同的功能啊
>
> 答: 这和下面的stateless component vs. stateful component 有关, 这样做可以将component的responsibility划分的更为清楚



```react
function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState('2020');

  const expenses = props.expenses;

  const filterChangeHandler = selectedYear => {
    setFilteredYear(selectedYear)
  }

  return (
    <Card className="expenses">
      <ExpensesFilter selectedYear = {filteredYear} onChangeFilter = {filterChangeHandler}/>

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



### :full_moon: Types of components 

Controlled vs Uncontrolled components & stateless vs stateful components

60

上面的<Expenses/> 相当于是在controll <ExpensesFilter/>, 因为前者定义了state和如何setState, 后者只是展示前者的state以及利用前者传来的function收集信息

就好比, 前后端的关系, 作为parent的<Expenses/>相当于后端, 其内部定义了state和如何setState, 往往比较复杂, 作为child的<ExpenseFilter/>相当于前端, 只是负责展示后端传来的数据, 以及收集用户的输入数据给后端让后端处理和管理数据 (two way binding)



Terminology: 

+ `stateless component`: also call presentational component or dumb component, 因为它自己内没有定义state和其如何改变, 只是接受别的component传来的state, 然后展示; 或者是接收调用别的component传来的收集信息的function
+ `stateful component`: 与stateless component相对应, 一般stateful component会是stateless component的parent



check chatGPT for more info and e.g.
