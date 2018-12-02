import React, { Component } from 'react';
import film_reel from './icons/film_reel.svg';
import { Route, Link, withRouter } from 'react-router-dom'
import CreatePost from './CreatePost';
import './App.css';
import {getLyrics, setSong, guess, startRun, tick} from './actions/index.js'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize';

class App extends Component {
  state = {
    hasSong : [],
    artist: [],
    song: [],
    lyrics: [],
    guess: "",
    elapsedTime: 0,
    seconds: 0,
    minutes: 0,
    timer: null
  }
  intervalHandle;
  secondsRemaining;
  componentDidMount() {
      this.setState({guess: ""})
      
  }
  handleTick = () => {
  this.props.dispatch(tick())
  }
  startTimer = () => {
    if(this.props.timer) {
      clearInterval(this.props.timer)
    }
    let timer = setInterval(this.handleTick, 1000)
    this.props.dispatch(startRun(timer))
    console.log("starting run")
  }
  handleChange = (e) => {
    e.preventDefault()
    switch(e.target.name){
      case "artist":
        this.setState({artist: e.target.value})
        break;
      case "song":
        this.setState({song: e.target.value})
        break;
      case "guess":
        //this.setState({guess: e.target.value})
        var cleanedInput = e.target.value.replace(/\W/g, '').toLowerCase()
        this.props.dispatch(guess(cleanedInput))
        break;
      default:
    }
  }
  handleGuess = (guess) => {
    this.props.lyrics.forEach(word => {
      if (word.lyric == guess) {
        console.log("guess worked")
        word.guessed = true
        word.display = word.lyric
      }
    });
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { has: true})

    this.props.dispatch(getLyrics(values.artist, values.song))
    
    this.props.dispatch(setSong(true, values.artist, values.song))
  } 
  handleNewSong = () => {
    this.props.dispatch(setSong(false))
    console.log("dispatching with false")
  }

  render() {
    const {hasSong, lyrics, guess, title, artist, numGuessed, numTotal,
    isRunning, isVictory, finalMinutes, finalSeconds, minutes, seconds} = this.props;
    //const lyrics = this.state.lyrics
    return (
      <div className="App">
       {isVictory &&
        <div className="victory-popup">
        <div className="victory-popup-content">
        Congratulations! <br/>
        You guessed all the lyrics for {title} by {artist} in: <br/>
        {finalMinutes}m {finalSeconds}s <br/>
        <button onClick={this.handleNewSong} className='link-button'>New Song</button>
        </div>
        </div>
        }
        <header className="App-header">
          <img src={film_reel} className="App-logo" alt="logo" />
          <h1 className="App-title">Guess them Lyrics</h1>
          
            <button onClick={this.handleNewSong} className='link-button'>New Song</button>
            
        </header>
        {!hasSong && 
        <div className="App-AddSong">
        <form onSubmit={this.handleSubmit} className="create-post-form">
          <div className="create-post-details">
            <div className="create-post-detail">
              Pick your favorite artist and song. <br/><br/>
            Artist <input type="text" name="artist" placeholder="Artist" value={this.state.artist} onChange={this.handleChange}/> <br/>
            </div>
            <div className="create-post-detail">
            Title <input type="text" name="song" placeholder="Song" value={this.state.song} onChange={this.handleChange}/> <br/>
            </div>
            <button className="link-button">Try It</button>
          </div>
        </form>
      </div>
        }

        {lyrics && hasSong &&
        
        <div className="App-Guesser">
          
          <div className="Timer">
            {!isRunning && 
            <button className="link-button" onClick={() => this.startTimer()}>Start Timer</button>
            }
            <div className="Timer-display">
            {minutes}m {seconds}s
            </div>
          </div>
          <div className="Scoreboard">
            <div className="Scoreboard-guessed">{numGuessed} / {numTotal}</div>
          </div>
          {isRunning &&
          <div className="Guesser-form">
            <form>
              Guess Lyric
              <input type="text" name="guess" value={guess} onChange={this.handleChange} />
            </form>
          </div>
          }
        </div>
        }
        {lyrics && hasSong &&
        <div className="App-lyrics">
        <ol className='post-list'>
        {lyrics.map((word) => (
            <li key={word.id} className='post-list-item'>
            {word.display}
            </li>
        ))
        }
        </ol>
        </div>
        }
       
     </div>
    );
  } 
}

function mapStateToProps (state) {
  return {
      hasSong: state.hasSong,
      lyrics: state.lyrics,
      title: state.title,
      artist: state.artist,
      guess: state.guess,
      numGuessed: state.numGuessed,
      numTotal: state.numTotal,
      isRunning: state.isRunning,
      isVictory: state.isVictory,
      finalMinutes: state.finalMinutes,
      finalSeconds: state.finalSeconds,
      minutes: state.minutes,
      seconds: state.seconds
  }
}

export default withRouter(
  connect(mapStateToProps)(App)
);
