import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../UI/Button/Button";
import "./CourseInput.css";

const FormControl = styled.div`
  margin: 0.5rem 0;

  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    color: ${(props) => (props.invalid ? "red":"black" )};
  }

  & input {
    display: block;
    width: 100%;
    border: 1px solid #ccc ${(props) => (props.invalid ? "red":"#ccc" )};
    background: ${(props) => (props.invalid ? "#ffd7d7" : "transparent")};
    /* background: ${(props) => {
      if (props.invalid) {
        console.log("oops!");
        return "#ffd7d7";
      } else{
        return "transparent";
      }
    }}; */
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }

  & input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  }

  /* for dynamic css class */
  /* &.invalid input {
    border-color: red;
    background: #ffd7d7;
  }

  &.invalid label {
    color: red;
  } */
`;

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  // get the input content via 'input' onChange event
  const goalInputChangeHandler = (event) => {
    // set isValid state back to normal
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    // set isValid state to abnormal
    if (enteredValue.trim().length === 0) {
      // adding an empty goal
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <FormControl invalid={!isValid}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </FormControl>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
