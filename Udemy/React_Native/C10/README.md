C10

send http requests



1h course content



# Abstract

:gem: code is based on previous class

+ Conntecting with backend & working with Remote data
  + Set up Dummy backend (use firebase) in this course (of course you can build any other types of database)
    + REST API
+ Send http request
+ Handling Loading & Error States



key takeaways

+ async await
+ firebase 
+ axios HTTP: CRUD
+ loading or request erros





# Prepare

## Set up Firebase

161

Firebase give us easy to use REST API

[Firebase | Google’s Mobile and Web App Development Platform](https://firebase.google.com/)

create project > Realtime Database



## Axios

Install

on top of Promise, which is a JS concept, not React-specific

https://axios-http.com/docs/intro





# Hands-on

## POST

163

util > http.js

```js
import axios from "axios";

export function storeExpense(expenseData) {
  axios.post(
    "https://react-native-course-58c78-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
    expenseData
  );
}
```





## GET

164







### use fetched data to frontend

165

here we get rid of dummy data but load data from database :

+ RecentExpenses Screen
  + useEffect(): when initial load, send HTTP GET request to get all expenses stores in database and set the resonse to ExpenseContext.expenses array (define this setExpenses(expenses) method in ContextProvider )
  + we still useContext to store expenses array as App-wide state.  If user add a new expense, first that expense is added to ExpenseContext.expenses array (this change triggers all related components to re-render), and that new expense is added to the database



### use reponse data from POST request

166

when post to firebase, firebase create an 'id'  (in firebase, the 'id' is the key (that big long string) ) automatically returned in response, we use the response to attach firebased generated id to expense obj in ExpensesContext.expenses[] 



## UPDARE & DELETE

167



http.js

```js
import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-58c78-default-rtdb.asia-southeast1.firebasedatabase.app/expenses";

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
```

ManageExpenses.js

+ 一般都分 CRUD locally & remotely
+ need async await

```js
 // ! CRUD handlers -----------------------------
  async function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId);    // delete locally
    await deleteExpense(editedExpenseId); // delete remotely
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
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
  }
  // !-----------------------------------------
```



# Error handling



## Managing the loading state

168

define a standalone state to reflect if the http request is done or not, and use this state to conditionally render the screen (if loading, show a LoadingOverlay component)





## :bangbang:Handling Request errors

169

http request might fail => need feedback to user

思路和上面类似
