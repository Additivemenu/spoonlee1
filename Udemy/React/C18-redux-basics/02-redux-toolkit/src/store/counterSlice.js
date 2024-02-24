import { createSlice} from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++; //  internally this mutable code is converted to immutable code by redux toolkit
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// !export below to allow component to dispatch actions
export const counterActions = counterSlice.actions;
// counterSlice.actions.toggleCounter()        // this returns an action object {type: 'counter/toggleCounter', payload: undefined}

export default counterSlice;