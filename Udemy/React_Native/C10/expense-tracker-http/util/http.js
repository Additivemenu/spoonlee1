import axios from "axios";

const BACKEND_URL =
  "https://reactt-native-course-58c78-default-rtdb.asia-southeast1.firebasedatabase.app/expenses";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id; // return id produced by firebase
}

export async function fetchExpenses() { // fetch all expenses
  const response = await axios.get(BACKEND_URL + "/expenses.json"); // this might take a while to get response

  // fetch what we received to an array
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses; // also yield a Promise
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
