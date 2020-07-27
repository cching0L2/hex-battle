import React from 'react';
import './App.css';
import ColorPicker from './ColorPicker';
import { ColorWrap } from 'react-color/lib/components/common';

class App extends React.Component {
  state = {
    goalColor: '#56364f',
    currentColor: '#123456',
    totalScore: 1923,
    currentRound: 1,
    totalRound: 5
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
          <h3>ROUND {this.state.currentRound}/{this.state.totalRound}</h3>
          <h3>SCORE: {this.state.totalScore}</h3>
        </div>
        <div className="inst-container">
          <h2>{this.state.goalColor.toUpperCase()}</h2>
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
