import { useState, useRef } from "react";
import styled from "styled-components";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";
import Wrapper from "../Helpers/Wrapper";

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
  const nameInputRef = useRef(); // an object with 'current' as its field
  const ageInputRef = useRef();

  // const [enteredUserName, setEnteredUserName] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    // use Ref to read value from <input>
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "invalid input",
        message: "Please enter a valid name and age (non-empty values)",
      });
      return;
    }

    if (+enteredUserAge < 1) {
      // make sure enterAge is a number, not a string
      setError({
        title: "invalid input",
        message: "Please enter a valid age (>0)",
      });
      return;
    }

    props.onAddUser(enteredName, enteredUserAge);

    // reset
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModel
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        ></ErrorModel>
      )}

      <StyledCard>
        <form onSubmit={addUserHandler}>
          {/* htmlFor property is used to bind label with input */}
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef}></input>

          <label htmlFor="age">Age(years)</label>
          <input id="age" type="number" ref={ageInputRef}></input>

          <Button type="submit">Add User</Button>
        </form>
      </StyledCard>
    </Wrapper>
  );
};

export default AddUser;
