import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function RecentExpenses() {
  const expenseCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  // send http GET request at inital loading
  useEffect(() => {
    // async callback
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses(); // ! http get request: yield a Promise
        expenseCtx.setExpense(expenses);
      } catch (error) {
        setError("Could not fetch all expenses!");
      }
      setIsFetching(false);
    }

    // run async callback
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  // show load spinning
  if (isFetching) {
    return <LoadingOverlay></LoadingOverlay>;
  }

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days!"
    />
  );
}

export default RecentExpenses;
