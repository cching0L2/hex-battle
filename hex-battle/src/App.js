import React from 'react';
import './App.css';
import ColorPicker from './ColorPicker';
import { ColorWrap } from 'react-color/lib/components/common';

class App extends React.Component {
  state = {
    goalColor: '#56364f"',
    currentColor: '#123456'
  }

  onChange = (e) => {
    console.log(e);
    this.setState({currentColor: e.hex});
  }

  render() {
    return (
      <div className="App">
        <div className="title-container">
          <h1 className="title">HEX BATTLE</h1>
        </div>
        <div className="stats-container">
          <h2>Round 1/5</h2>
          <h2>Score: 1579</h2>
        </div>
        <div className="inst-container">
          <h2>{this.state.goalColor}</h2>
        </div>
        <div className="picker-container">
          <ColorPicker 
            onChangeComplete={this.onChange}
            color={this.state.currentColor}
          />
        </div>
        <h3>Your pick:</h3>
        <div className="chosen" style={{backgroundColor: this.state.currentColor}}></div>
        <h2>Confirm</h2>
      </div>
    );
  }
}


export default App;
