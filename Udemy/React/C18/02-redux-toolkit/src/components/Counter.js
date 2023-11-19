import { useSelector, useDispatch } from "react-redux";

import { counterActions } from "../store/counterSlice";
import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter); // useSelector is a hook that allows us to extract data from the store
  const showCounter = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    // dispatch({ type: "increment" });
    dispatch(counterActions.increment()); // internally this is converted to {type: 'counter/increment', payload: undefined}
  };

  const increaseHandler = () => {
    // dispatch({ type: "increase", amount: 10 });
    dispatch(counterActions.increase(10)); // internally this is converted to {type: 'counter/increase', payload: 10}
  };

  const decrementHandler = () => {
    // dispatch({ type: "decrement" });
    dispatch(counterActions.decrement()); // internally this is converted to {type: 'counter/decrement', payload: undefined}
  };

  const toggleCounterHandler = () => {
    // dispatch({ type: "toggle" });
    dispatch(counterActions.toggleCounter()); // internally this is converted to {type: 'counter/toggleCounter', payload: undefined}
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>increment</button>
        <button onClick={increaseHandler}>increase by 10</button>
        <button onClick={decrementHandler}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
