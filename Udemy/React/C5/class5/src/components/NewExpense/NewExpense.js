import React, { useState } from "react";
import "./NewExpense.css";

import ExpenseForm from "./ExpenseForm";

// stateful component
const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const startEditingHandler = (event) => {
    setIsEditing(true);
    console.log(isEditing);
  };

  // we will pass this function to child component
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    // console.log(expenseData);
    props.onAddExpense(expenseData);
  };

  return (
    <div className="new-expense">
      {!isEditing && <button onClick={startEditingHandler}>Create new expense card</button>}
      {isEditing &&  <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onClickCancel={setIsEditing} />}
    </div>
  );
};

export default NewExpense;
