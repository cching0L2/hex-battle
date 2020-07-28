import React from 'react';
import reactCSS from 'reactcss'
import ColorPicker from './ColorPicker';
import * as Utils from './utils';
import * as Constants from './constants';
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
      color: '#D90368',
      margin: '8px'
    },
    goalColor: {
      marginTop: '8px'
    },
    pickerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '36px 0px'
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
      fontWeight: 'bold',
    }
  },
})

function StatsSection(props) {
  return (
    <div style={ styles.statsContainer }>
      { props.totalRound > 1 && <h3 style={ styles.stats }>ROUND { props.currentRound } / { props.totalRound }</h3> }
      <h3 style={ styles.stats }>SCORE: { Math.round(props.totalScore) } / { Constants.ROUND_MAX_SCORE }</h3>
    </div>
  );
}

function InstructionSection(props) {
  return (
    <div style={ styles.statsContainer }>
      <h4 style={ styles.instruction }>Use color picker below to pick out the color:</h4>
      <h2 style={ styles.goalColor }>{ props.goalColor && props.goalColor.toUpperCase() }</h2>
    </div>
  );
}

function PickerSection(props) {
  return (
    <div style={ styles.pickerContainer }>
      <ColorPicker 
        onChangeComplete={ props.onChange }
        color={ props.currentColor }
      />
    </div>
  );
}

/*
 * Game logic
 *
 * Starting / ending game, scoring etc.
 */
class GameBoard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      totalScore: 0,
      totalRound: this.props.totalRound,
    };
  }

  componentDidMount() {
    this.startRound(1);
  }

  onChange = (e) => {
    console.log(e);

    this.setState({ currentColor: e.hex });
  }

  onConfirm = () => {
    this.endRound();
  }

  startRound = (roundNumber) => {
    this.setState({
      goalColor: Utils.getRandomColor(),
      currentColor: Utils.getRandomColor(),
      currentRound: roundNumber,
      isRoundActive: true
    });
  }

  endRound = () => {
    // TODO: do scoring here
    const colorDist = Utils.calcColorDistance(this.state.goalColor, this.state.currentColor);
    console.log("colorDist: " + colorDist);
    const score = Utils.mapColorDistToRoundScore(colorDist);
    console.log(score);

    this.setState({
      isRoundActive: false,
      totalScore: score
    })

    // TODO: show end screen
  }

  render() {
    return (
      <div style={ styles.App }>
        <div style={ styles.titleContainer }>
          <h1 style={ styles.title }>HEX BATTLE</h1>
        </div>

        <StatsSection
          totalRound={ this.state.totalRound }
          currentRound={ this.state.currentRound }
          totalScore={ this.state.totalScore }
        />

        { this.state.isRoundActive && 
          <InstructionSection goalColor={ this.state.goalColor }/>
        }

        { this.state.isRoundActive && 
          <PickerSection onChange={ this.onChange } currentColor={ this.state.currentColor } />
        }

        <h3 style={ styles.yourPick }>Your pick:</h3>
        <div style={ Object.assign({backgroundColor: this.state.currentColor}, styles.chosen) }></div>
        <button
          style={ styles.confirm }
          className="confirm-btn"
          onClick={ this.onConfirm }
        >Confirm</button>
      </div>
    );
  }
}

export default GameBoard;
