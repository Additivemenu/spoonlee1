import { createSlice} from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false };
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

// !export below to allow component to dispatch actions
export const authActions = authSlice.actions;

export default authSlice;