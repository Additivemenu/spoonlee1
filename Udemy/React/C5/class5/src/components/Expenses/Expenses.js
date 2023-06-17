import { useState } from "react";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import ExpenseList from "./ExpenseList";

// the component stands at the bottom of page: a filter + expense list
function Expenses(props) {

  const [filteredYear, setFilteredYear] = useState("2020");   // due to state lift up
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  // whenever state filteredYear is changed, the whole component function will be re-executed
  // filteredExpenses相当于一个derived state based on filteredYear
  const filteredExpenses = props.expenses.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });



  return (
    <Card className="expenses">
      <ExpensesFilter
        selectedYear={filteredYear}
        onChangeFilter={filterChangeHandler}
      />

      <ExpenseList items = {filteredExpenses}/>

    </Card>
  );
}

export default Expenses;
