import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredDate: "",
  // });

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);

    // setUserInput({
    //   ...userInput,             // need to keep other attribute as it is or they will be rejected if you don't use spread operator
    //   enteredTitle: event.target.value
    // });

    // setUserInput((prevState) => {
    //   return { ...prevState, enteredTitle: event.target.value };
    // });
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);

    // setUserInput({
    //   ...userInput, // need to keep other attribute as it is or they will be rejected if you don't use spread operator
    //   enteredAmount: event.target.value,
    // });
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);

    // setUserInput({
    //   ...userInput, // need to keep other attribute as it is or they will be rejected if you don't use spread operator
    //   enteredDate: event.target.value,
    // });
  };

  const submitHandler = (event) => {
    event.preventDefault(); // vanilla javascript, not react. The default is that the web page will reload,
    // because the browser will send a request to the server that hold this webpage on a submit event
    // but this is not what we want, so we just disable its default behaviour

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate), // convert string to a Date object
    };

    props.onSaveExpenseData(expenseData);  // 从parent component那里传来的function
    
    // set state: clickNewItem 
    clickCancelHandler(event);

    // reset the input field to empty after submit
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  const clickCancelHandler = (event) =>{
    props.onClickCancel(false);
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
        {/* type = "submit" means if this button is clicked, it will also trigger submit of the form
            type = "button" means this button is just a normal button, click on it will not trigger submit of the form */}
        <button type="button" onClick={clickCancelHandler}>Cancel</button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
