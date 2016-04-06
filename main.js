import React from 'react';
import ReactDOM from 'react-dom';
import store from './logic';
import {connect, Provider} from 'react-redux';
import {bindActionCreators} from 'redux';

// action creators
function colorChange(newColor) {
  return {
    type: 'COLOR_CHANGE',
    color: newColor
  };
}

//async action creators
function colorChangeTemp(newColor) {
  return function(dispatch) {
    dispatch(colorChange(newColor));
    setTimeout(function() {
      dispatch(colorChange('red'));
    }, 5000);
  }
}

class ColorChanger extends React.Component {
  buttonClicked() {
    this.props.bgChange(this.refs.theColor.value);
  }
  render() {
    return (
      <div id="main"
        style={{width: '100vw', height: '50vh', backgroundColor: this.props.bgcolor}}

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
      bgChange: colorChangeTemp
    }, dispatch);
  }
)(ColorChanger);


class ColorDisplayer extends React.Component {
  render() {
    return (
      <div>The current color is: {this.props.color}</div>
    )
  }
}
ColorDisplayer.propTypes = {
  color: React.PropTypes.string.isRequired
};

ColorDisplayer= connect(
  function(state) {
    return {
      color:state.color
    }
  }
)(ColorDisplayer);


class Demo extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     color: store.getState().color
  //   }
  // }
  // componentDidMount() {
  //   this.unsub = store.subscribe(() => {
  //     that.setState({
  //       color: store.getState().color
  //     })
  //   })
  // }
  // componentWillUnmount() {
  //   this.unsub();
  // }

  render() {
    return (
      <div>
        <ColorChanger  />
        <ColorDisplayer  />
      </div>
    )
  }
}

ReactDOM.render(<Provider store={store}><Demo/></Provider>, document.getElementById('app'));
