import React from 'react';
import './App.css';
import reactCSS from 'reactcss'
import GameBoard from './GameBoard';

class App extends React.Component {

  render() {
    return (
      <GameBoard totalRound={1}/>
    );
  }
}


export default App;
