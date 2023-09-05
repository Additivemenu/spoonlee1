import { useLayoutEffect, useContext, useState } from "react";
import { TextInput, View } from "react-native";

import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import { StyleSheet } from "react-native";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function ManageExpenses({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  // control 2 mode
  const editedExpenseId = route.params?.expenseId; // if route has parameter, if does it is in Edit mode not add mode
  const isEditing = !!editedExpenseId; // convert a value to boolean

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  // ! CRUD handlers -----------------------------
  async function deleteExpenseHandler() {
    setIsSubmitting(true);

    try {
      expenseCtx.deleteExpense(editedExpenseId); // delete locally
      await deleteExpense(editedExpenseId); // delete remotely
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense- please try again later");
    }

    setIsSubmitting(false);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        // for editing (update) expense
        expenseCtx.updateExpense(editedExpenseId, expenseData); // update locally
        await updateExpense(editedExpenseId, expenseData); // update to remote
      } else {
        // for adding expense
        const id = await storeExpense(expenseData); // id is produced by firebase, store remotely
        expenseCtx.addExpense({ ...expenseData, id: id }); // store locally
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save save data - please try again later");
      setIsSubmitting(false);
    }
  }
  // !-----------------------------------------

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
