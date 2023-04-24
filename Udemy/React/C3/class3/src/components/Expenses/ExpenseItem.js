import React, {useState} from 'react';

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {

  // react state
  const  [title, setTitle] = useState(props.title);
  console.log("Expense item's state is evaluated");

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

export default ExpenseItem;
