const redux = require('redux');

// (older state + dispatch action) : New State Object => {}     
// reducer should be a pure function, no side-effects inside
const counterReducer = (state = {counter: 0}, action) => {      // give old state a default value for first run
    if(action.type === 'increment') {

        return {
            counter: state.counter + 1
        };
    }

    if(action.type === 'decrement') {
        return {
            counter: state.counter - 1
        }
    }

    return state;
    
}

const store = redux.createStore(counterReducer);        // this also calls the reducer once to initialize the state
console.log(store.getState());                          // get the current state

// this gets executed whenever the state changes, to simulate a React Component
const counterSubscriber = () => {
    const latestState = store.getState();       // get the latest state after dispatch
    console.log(latestState);
}
store.subscribe(counterSubscriber);             // ! subscribe to the store


// issue actions to the store, which in turn triggers the change of component state
store.dispatch({type: 'increment'});            // dispatch an action
store.dispatch({type: 'decrement'});            // dispatch an action
