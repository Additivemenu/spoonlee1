Class5: Rendering List & Conditional content



# Summary

代码在C5 > class5

两个内容:

+ output dynamic list of content
+ rendering content under certain conditions



# Rendering Lists

## Rendering Lists of data

63- 65

```react
function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState("2020");

  const expenses = props.expenses;

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <Card className="expenses">
      <ExpensesFilter
        selectedYear={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
			
      // 在这儿用js array.map()语法来dynamically mapping list data to components
      {expenses.map((expense) => {
        return (
          <ExpenseItem
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        );
      })}

    </Card>
  );
}
```



Using stateful lists

看到这里

64

```react

// 数据写到component function 外面
const DUMMY_EXPENSES = [
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

function App() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    // setExpenses([expense, ...expenses]);		// 因为state change是基于previous state, 所以用下面写法
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses}></Expenses>
    </div>
  );
}
```



:bangbang: 这里我的代码还有bug, 需要debug一下再往下看! 另外整理下这里stateful 和 stateless component对应谁, 总结下当点击submit button后信息的流向, 



Understand "key"

65



# Conditional content

## Outputing Conditional content





## Adding conditional return statements



## Demo App: Adding a Chart



## Adding dynamic styles



## Wrap up & next steps







