import React from 'react';
import './App.css';
import reactCSS from 'reactcss'
import ColorPicker from './ColorPicker';
import { ColorWrap } from 'react-color/lib/components/common';

const styles = reactCSS({
  'default': {
    App: {
      textAlign: 'center'
    },
    title: {
      color: '#55868C',
      fontSize: '40px'
    },
    titleContainer: {
      marginTop: '48px'
    },
    statsContainer: {
      marginTop: '36px',
    },
    stats: {
      margin: '8px 0px',
      color: "#474056"
    },
    instContainer: {
      marginTop: '36px',
    },
    instruction: {
      color: '#D90368'
    },
    pickerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '24px 0px'
    },
    yourPick: {
      color: "#474056",
      marginTop: '32px'
    },
    chosen: {
      height: "60px",
      width: "100px",
      border: "1px solid #AAA",
      margin: "auto"
    },
    confirm: {
      backgroundColor: 'transparent',
      border: 'none',
      fontFamily: "Nunito",
      marginTop: '24px',
      fontSize: '22px',
      fontWeight: 'bold'
    }
  },
})

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

  onConfirm = (e) => {

  }

  render() {
    return (
      <div style={ styles.App }>
        <div style={ styles.titleContainer }>
          <h1 style={ styles.title }>HEX BATTLE</h1>
        </div>
        <div style={ styles.statsContainer }>
          <h3 style={ styles.stats }>ROUND {this.state.currentRound}/{this.state.totalRound}</h3>
          <h3 style={ styles.stats }>SCORE: {this.state.totalScore}</h3>
        </div>
        <div style={ styles.statsContainer }>
          <h4 style={ styles.instruction }>Use color picker below to pick out the color:</h4>
          <h2>{this.state.goalColor.toUpperCase()}</h2>
        </div>
        <div style={ styles.pickerContainer }>
          <ColorPicker 
            onChangeComplete={this.onChange}
            color={this.state.currentColor}
          />
        </div>
        <h3 style={ styles.yourPick }>Your pick:</h3>
        <div style={ Object.assign({backgroundColor: this.state.currentColor}, styles.chosen) }></div>
        <button
          style={ styles.confirm }
          onClick={ this.onConfirm }
        >Confirm</button>
      </div>
    );
  }
}


export default App;
