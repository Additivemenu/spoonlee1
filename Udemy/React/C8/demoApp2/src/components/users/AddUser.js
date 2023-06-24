import { useState } from "react";
import styled from "styled-components";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";

// to style an existing component
const StyledCard = styled(Card)`
  margin: 2rem auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  input {
    font: inherit;
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    padding: 0.15rem;
    margin-bottom: 0.5rem;
  }

  input:focus {
    outline: none;
    border-color: #4f005f;
  }
`;

const AddUser = (props) => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "invalid input",
        message: "Please enter a valid name and age (non-empty values)",
      });
      return;
    }

    if (+enteredAge < 1) {
      // make sure enterAge is a number, not a string
      setError({
        title: "invalid input",
        message: "Please enter a valid age (>0)",
      });
      return;
    }

    props.onAddUser(enteredUserName, enteredAge);

    setEnteredUserName("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUserName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModel title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModel>
      )}

      <StyledCard>
        <form onSubmit={addUserHandler}>
          {/* htmlFor property is used to bind label with input */}
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={usernameChangeHandler}
            value={enteredUserName}
          ></input>

          <label htmlFor="age">Age(years)</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={enteredAge}
          ></input>

          <Button type="submit">Add User</Button>
        </form>
      </StyledCard>
    </div>
  );
};

export default AddUser;
