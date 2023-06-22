import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Form = styled.form`
  padding: 1rem;
  max-width: 30rem;
  margin: 2rem auto;
  border-radius: 4px;
  background: linear-gradient(180deg, #307e6c, #2b996d);

  .input-group {
    display: flex;
    justify-content: space-evenly;
    gap: 1.5rem;
  }

  & label {
    display: block;
    margin-bottom: 0.25rem;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 0.5rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  & input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #76c0ae;
    border-radius: 0.25rem;
    background-color: transparent;
    color: #c2e9e0;
    font-size: 1rem;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background: linear-gradient(180deg, #1f584b, #17493d);
    color: #c2e9e0;
    font-family: "Roboto Condensed", sans-serif;
    cursor: pointer;

    &:hover {
      background: linear-gradient(180deg, #1b5346, #113c32);
    }
  }

  .buttonAlt {
    font-family: "Roboto Condensed", sans-serif;
    border: none;
    background: transparent;
    color: #c2e9e0;
    cursor: pointer;

    &:hover {
      background: transparent;
      color: #91e1d0;
    }
  }
`;

// ------------------------------------------------------------------

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
    // to capture user input value based on previous state
    setUserInput((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
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
    console.log("reset form");
    props.setIsInputValid(false);
  };

  return (
    <Form onSubmit={submitHandler} onReset={resetHandler}>
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
    </Form>
  );
};

export default CalculateForm;
