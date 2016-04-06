import React from 'react';
import ReactDOM from 'react-dom';
import store from './logic';
import {connect, Provider} from 'react-redux';
import {bindActionCreators} from 'redux';
// import getSynonym from './api';
import superagent from 'superagent';

var bhtKey = "41acd19c3639856d205e03a0c61fdb5b";

function getSynonym(word, cb) {
  superagent
  .get('https://words.bighugelabs.com/api/2/' + bhtKey + '/' + word + '/json')
  .end(function(err, res) {
    if (err || !res.ok) {
      console.log('Oh no! error');
    } else {
      console.log(JSON.parse(res.text));
      var synonym = JSON.parse(res.text).adjective.syn[0];
      console.log(synonym);
      return cb(synonym);
    }
  });
}


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
    dispatch(synonymChange(newColor));
    setTimeout(function() {
      dispatch(synonymChange('red'));
      dispatch(colorChange('red'));
    }, 5000);
  }
}

function synonymChange(newColor) {
  return function(dispatch) {
    superagent
    .get('https://words.bighugelabs.com/api/2/' + bhtKey + '/' + newColor + '/json')
    .end(function(err, res) {
      if (err || !res.ok) {
        console.log('Oh no! error');
      } else {
        console.log(JSON.parse(res.text));
        var synonym = JSON.parse(res.text).adjective.syn.pop();
        console.log(synonym);
        dispatch(
          {
            type: 'SYN_CHANGE',
            synonym: synonym
          }
        );
      }
    });
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

class SynDisplayer extends React.Component {
  render() {
    return (
      <div>
        {'A possible synonym is: ' + this.props.word}
      </div>
    )
  }
}
SynDisplayer.propTypes = {
  word: React.PropTypes.string
}
SynDisplayer= connect(
  function(state) {
    return {
      word: state.synonym
    }
  }
)(SynDisplayer);

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
        <ColorChanger />
        <ColorDisplayer />
        <SynDisplayer />
      </div>
    )
  }
}

ReactDOM.render(<Provider store={store}><Demo/></Provider>, document.getElementById('app'));
