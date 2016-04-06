import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


//  Inital State
var initialState = {
  color: "blue",
  synonym: 'royal'
}


//  Reducer A.K.A. state calculator
var colorReducer = function(currentState = initialState, action) {
  switch (action.type) {
    case 'COLOR_CHANGE':
      return Object.assign(
        {},
        currentState,
        {
          color: action.color
        }
      );
      break;
      case 'SYN_CHANGE':
        return Object.assign(
          {},
          currentState,
          {
            synonym: action.synonym
          }
        );
      break;
    default:
    return currentState;

  }
}


// Store
var store = createStore(colorReducer, applyMiddleware(thunk));

store.subscribe(function() {
  console.log('STORE CHANGED', store.getState());
});


  // Exports from logic.js
  export default store;
