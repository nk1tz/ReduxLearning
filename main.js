import React from 'react';
import ReactDOM from 'react-dom';
import store from './logic';
import {connect, Provider} from 'react-redux';
import {bindActionCreators} from 'redux';
import api from './api';
import superagent from 'superagent';

// ------- action creators -------
function colorChange(newColor) {
  return {
    type: 'COLOR_CHANGE',
    color: newColor
  };
}

// ------- async action creators -------
function colorChangeTemporarily(newColor) {
  return function(dispatch) {
    dispatch(colorChange(newColor));
    dispatch(synonymChange(newColor));
    dispatch(definitionChange(newColor));
    setTimeout(function() {
      dispatch(synonymChange('red'));
      dispatch(colorChange('red'));
      dispatch(definitionChange('red'));
    }, 5000);
  }
}

function synonymChange(newColor) {
  return function(dispatch) {
    api.getSynonym(newColor, (synonym) => {
      dispatch({
        type: 'SYN_CHANGE',
        synonym: synonym
      });
    });
  }
}

function definitionChange(newColor) {
  return function(dispatch) {
    api.getDefinition(newColor, (definition) => {
      dispatch({
        type: 'DEFINITION_CHANGE',
        definition: definition
      });
    });
  }
}


// -------------- Components --------------
// ----------------------------------------
class ColorChanger extends React.Component {
  buttonClicked() {
    this.props.bgChange(this.refs.theColor.value);
  }
  render() {
    return (
      <div id="main"
        style={{
          width: '100vw',
          height: '50vh',
          backgroundColor: this.props.bgcolor
        }}
      >
        <input ref="theColor" type="text" />
        <button onClick={this.buttonClicked.bind(this)}>change color</button>
      </div>
    )
  }
}
ColorChanger.propTypes = {
  bgcolor: React.PropTypes.string.isRequired,
  bgChange: React.PropTypes.func.isRequired
};
ColorChanger = connect(
  function(state) {
    return {
      bgcolor:state.color
    }
  },
  function(dispatch) {
    return bindActionCreators({
      bgChange: colorChangeTemporarily
    }, dispatch);
  }
)(ColorChanger);


class ColorDisplayer extends React.Component {
  render() {
    return (
      <div>
        <div>The current color is: {this.props.color}</div>
        <div>'A possible synonym is: {this.props.synonym}</div>
        <div>'A definition is: {this.props.definition}</div>
      </div>
    )
  }
}
ColorDisplayer.propTypes = {
  color: React.PropTypes.string.isRequired,
  synonym: React.PropTypes.string,
  definition: React.PropTypes.string
};
ColorDisplayer= connect(
  function(state) {
    return {
      color:state.color,
      synonym: state.synonym,
      definition: state.definition
    }
  }
)(ColorDisplayer);


class Demo extends React.Component {

  render() {
    return (
      <div>
        <ColorChanger />
        <ColorDisplayer />
      </div>
    )
  }
}

ReactDOM.render(<Provider store={store}><Demo/></Provider>, document.getElementById('app'));
