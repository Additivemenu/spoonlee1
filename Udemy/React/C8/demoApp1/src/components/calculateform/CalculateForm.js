import React from "react";
import { useState, useEffect } from "react";

const USERINPUT_INIT = {
  "current-savings": "",
  "yearly-contribution": "",
  "expected-return": "",
  duration: "",
};

const CalculateForm = (props) => {
  const [userInput, setUserInput] = useState(USERINPUT_INIT);

  useEffect(() => {
    console.log("userInput is changed to: ", userInput);
  }, [userInput]);

  const handleInputChange = (event) => {
    // to capture user input value
    setUserInput({ ...userInput, [event.target.name]: event.target.value });  
  };

  const submitHandler = (event) => {
    event.preventDefault(); // prevent page refresh

    console.log("start to handle sumbit");

    if (!checkUserInput()) {
      // props.setIsInputValid(false);
      console.log("invalid user input!");
      return;
    }

    console.log("passed input check!");
    // props.setIsInputValid(true);
    props.onCalculate(userInput);
  };

  const checkUserInput = () => {
    console.log("");
    const anyInputEmpty = Object.values(userInput).some(
      (value) => value === ""
    );
    if (anyInputEmpty) {
      props.setIsInputValid(false);
      return false;
    } else {
      props.setIsInputValid(true);
      return true;
    }
  };

  const resetHandler = () => {
    setUserInput({ ...userInput, ...USERINPUT_INIT });
    console.log("reset form")
    props.setIsInputValid(false);
  };

  return (
    <form className="form" onSubmit={submitHandler} onReset={resetHandler}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            name="current-savings"
            type="number"
            onChange={handleInputChange}
            id="current-savings"
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            name="yearly-contribution"
            type="number"
            onChange={handleInputChange}
            id="yearly-contribution"
          />
        </p>
      </div>

      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            name="expected-return"
            type="number"
            onChange={handleInputChange}
            id="expected-return"
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            name="duration"
            type="number"
            onChange={handleInputChange}
            id="duration"
          />
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
