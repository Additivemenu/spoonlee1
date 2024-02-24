import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./counterSlice";
import authSlice from "./authSlice";


// configStore will merge multiple reducers into one
const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});



// ! export below to register store in the Provider
export default store;
