import React from "react";

import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

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


  const addExpenseHandler = expense => {
    console.log ('In App.js');
    console.log(expenses);
  }

  return (
    <div className="App">
      <NewExpense onAddExpense = {addExpenseHandler}/>
      <Expenses expenses = {expenses}></Expenses>
    </div>
  );

  // // closer look at jsx
  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement("h2", {}, "let's get started"),
  //   React.createElement(Expenses, { expenses: expenses })
  // );
}

export default App;