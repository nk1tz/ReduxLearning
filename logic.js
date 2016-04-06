import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

var initialState = {
  color: "blue"
}

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
    default:
      return currentState;

  }
}

var store = createStore(colorReducer, applyMiddleware(thunk));

store.subscribe(function() {
  console.log('STORE CHANGED', store.getState());
});

export default store;
