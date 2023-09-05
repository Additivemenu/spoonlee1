import { createContext, useReducer } from "react";


export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpense: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

// reducer function: always return a new state (similar to cmmand pattern)
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state]; // add an obj to expenses array, id is created by firebased and is in action.payload
    case "SET":
      const inverted = action.payload.reverse();  // firebase stores expenses in chronological order
      return inverted;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data }; // a temp variable,  overwirte (update) target expense obj
      const updatedExpenses = [...state]; // a temp variable
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses; // newly updated state
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  // hook: connect state and reducer function
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData }); // dispatch action to reudcer function
  }
  function setExpense(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpense: setExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
