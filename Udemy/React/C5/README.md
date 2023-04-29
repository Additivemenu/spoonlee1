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





Understand "key"

# Conditional content

## Outputing Conditional content





## Adding conditional return statements



## Demo App: Adding a Chart



## Adding dynamic styles



## Wrap up & next steps







