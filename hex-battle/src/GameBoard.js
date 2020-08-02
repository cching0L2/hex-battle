import React from 'react';
import reactCSS from 'reactcss'
import * as _ from 'underscore'
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
    preview: {
      height: "60px",
      width: "100px",
      border: "1px solid #AAA",
      margin: "auto"
    },
    button: {
      backgroundColor: 'transparent',
      border: 'none',
      marginTop: '24px',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    breakdownContainer: {
      width: '480px',
      height: '240px',
      margin: '0px auto 60px auto',
      textAlign: "center",
    },
    breakdownHeader: {
      margin: '4px',
    }
  },
})

function RoundActiveSection(props) {
  return (
    <div>
      <StatsSection
        totalRound={ props.totalRound }
        currentRound={ props.currentRound }
        totalScore={ props.totalScore }
      />
      <InstructionSection goalColor={ props.goalColor }/>
      <PickerSection onChange={ props.onChange } currentColor={ props.currentColor } />
      <h3 style={ styles.yourPick }>Your pick:</h3>
        <ColorPreviewBlock color={ props.currentColor } />
        <button
          style={ styles.button }
          className="btn"
          onClick={ props.onConfirm }
        >Confirm</button>
    </div>
  );
}

function ColorPreviewBlock(props) {
  const newStyle = {
    backgroundColor: props.color,
    width: props.width,
    height: props.height
  }

  console.log(_.defaults(newStyle, styles.preview));

  return (
    <div style={ _.defaults(newStyle, styles.preview) }></div>
  );
}

function RoundResultSection(props) {
  return (
    <div>
      <HexToRgbBreakdown
        currentColor={ props.currentColor }
        goalColor={ props.goalColor }
      />
      <h3>You received { Math.round(props.totalScore) } / 5000 for this round </h3>
      <button
          style={ styles.button }
          className="btn play-again-btn"
          onClick={ props.onPlayAgain }
        >Play Again</button>
    </div>
  );
}

function HexToRgbBreakdown(props) {
  const currentColorRgb = Utils.hexToRgb(props.currentColor);
  const goalColorRgb = Utils.hexToRgb(props.goalColor);

  return (
    <table style={ styles.breakdownContainer }>
      <thead>
        <tr style={{verticalAlign: "text-top"}}>
          <th>
            <h4>Actual</h4>
            <ColorPreviewBlock height="40px" width="60px" color={ props.goalColor } />
            <h5>{ props.goalColor && props.goalColor.toUpperCase() }</h5>
          </th>
          <th>Difference</th>
          <th>
            <h4>You picked</h4>
            <ColorPreviewBlock height="40px" width="60px" color={ props.currentColor } />
            <h5>{ props.currentColor && props.currentColor.toUpperCase() }</h5>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{color: "red"}}> 
          <td><span>R</span>: { goalColorRgb.r }</td>
          <td>({ goalColorRgb.r - currentColorRgb.r })</td>
          <td>R: { currentColorRgb.r }</td>
        </tr>
        <tr style={{color: "green"}}> 
          <td>G: { goalColorRgb.g }</td>
          <td>({ goalColorRgb.g - currentColorRgb.g })</td>
          <td>G: { currentColorRgb.g }</td>
        </tr>
        <tr style={{color: "blue"}}> 
          <td>B: { goalColorRgb.b }</td>
          <td>({ goalColorRgb.b - currentColorRgb.b })</td>
          <td>B: { currentColorRgb.b }</td>
        </tr>
      </tbody>
    </table>
  );
}

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

  onPlayAgain = () => {
    const isFreshStart = (this.state.currentRound >= this.state.totalRound) ? true : false;

    if (isFreshStart) {
      this.setState({
        totalScore: 0
      });
      this.startRound(1);
    } else {
      this.startRound(this.stae.currentRound + 1);
    }
  }

  startRound = (roundNumber) => {
    this.setState({
      goalColor: Utils.getRandomColor(),
      currentColor: Utils.getRandomColor(),
      currentRound: roundNumber,
      isRoundActive: true,
    });
  }

  endRound = () => {
    const colorDist = Utils.calcColorDistance(this.state.goalColor, this.state.currentColor);
    const score = Utils.mapColorDistToRoundScore(colorDist);

    this.setState({
      isRoundActive: false,
      totalScore: score,
    })

    // TODO: show end screen
  }

  render() {
    return (
      <div style={ styles.App }>
        <div style={ styles.titleContainer }>
          <h1 style={ styles.title }>HEX BATTLE</h1>
        </div>

        { this.state.isRoundActive && 
          <RoundActiveSection
            goalColor={ this.state.goalColor }
            currentColor={ this.state.currentColor }
            totalRound={ this.state.totalRound }
            currentRound={ this.state.currentRound }
            totalScore={ this.state.totalScore }
            onChange={ this.onChange }
            onConfirm={ this.onConfirm }
          />
         }

        { !this.state.isRoundActive && 
          <RoundResultSection
            goalColor={ this.state.goalColor }
            currentColor={ this.state.currentColor }
            totalScore={ this.state.totalScore }
            onPlayAgain={ this.onPlayAgain }
          />
        }
      </div>
    );
  }
}

export default GameBoard;
