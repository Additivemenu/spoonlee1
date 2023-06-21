import React from "react";
import {useState} from "react";


const userInput_init = {
  "current-savings": 0,
  "yearly-contribution": 0,
  "expected-return": 0,
  "duration": 0
}

const CalculateForm = (props) => {

  const [userInput, setUserInput]= useState(userInput_init);

  const handleInputChange = (event) => {  // to capture user input value
    setUserInput({...userInput, [event.target.name]:event.target.value});
    console.log(userInput);
  }

  const submitHandler = (event) => {
    event.preventDefault(); // prevent page refresh
  
    if(!checkUserInput()){
      props.setIsInputValid(false);
      return;
    }
    props.onCalculate(userInput);
  
  }

  const checkUserInput = () => {
    const anyInputEmpty = Object.values(userInput).some(value => value === 0);
    if(anyInputEmpty){
      return false;
    } else{
      return true;
    }
  }

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input name="current-savings" type="number" onChange={handleInputChange} id="current-savings" />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input name="yearly-contribution" type="number" onChange={handleInputChange} id="yearly-contribution" />
        </p>
      </div>

      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input name="expected-return" type="number" onChange={handleInputChange} id="expected-return" />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input name="duration" type="number" onChange={handleInputChange} id="duration" />
        </p>
      </div>

      <p className="actions">
        <button type="reset" className="buttonAlt">
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  );
};

export default CalculateForm;
