import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


//  Inital State
var initialState = {
  color: "blue",
  synonym: 'royal',
  definition: 'The hue of that portion of the visible spectrum lying between green and indigo, evoked in the human observer by radiant energy with wavelengths of approximately 420 to 490 nanometers; any of a group of colors that may vary in lightness and saturation, whose hue is that of a clear daytime sky; one of the additive or light primaries; one of the psychological primary hues.'
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
      case 'DEFINITION_CHANGE':
        return Object.assign(
          {},
          currentState,
          {
            definition: action.definition
          }
        );
    default:
    return currentState;
  }
}


// Store
var store = createStore(colorReducer, applyMiddleware(thunk));

store.subscribe(function() {
  console.log('STORE (State) CHANGED', store.getState());
});


  // Exports from logic.js
  export default store;
