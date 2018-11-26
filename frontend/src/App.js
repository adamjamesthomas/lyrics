import React, { Component } from 'react';
import film_reel from './icons/film_reel.svg';
import { Route, Link, withRouter } from 'react-router-dom'
import CreatePost from './CreatePost';
import './App.css';
import {getLyrics, setSong} from './actions/index.js'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize';

class App extends Component {
  state = {
    hasSong : [],
    artist: [],
    song: [],
    lyrics: []
  }
  componentDidMount() {
      //this.props.dispatch(getLyrics("John Lennon", "Imagine"))
      
  }
  handleChange = (e) => {
    switch(e.target.name){
      case "artist":
        this.setState({artist: e.target.value})
        break;
      case "song":
        this.setState({song: e.target.value})
        break;
      case "guess":
        this.handleGuess(e.target.value)
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
    const {hasSong, lyrics, itle, artist} = this.props;
    //const lyrics = this.state.lyrics
    console.log(hasSong)
    return (
      <div className="App">
        <header className="App-header">
          <img src={film_reel} className="App-logo" alt="logo" />
          <h1 className="App-title">Guess them Lyrics</h1>
          
            <button onClick={this.handleNewSong} className='link-button'>New Song</button>
            
        </header>
        {!hasSong && 
        <div>
        <form onSubmit={this.handleSubmit} className="create-post-form">
          <div className="create-post-details">
            <div className="create-post-detail">
              Pick your favorite artist and song. <br/><br/>
            Artist <input type="text" name="artist" placeholder="Artist" value={this.state.artist} onChange={this.handleChange}/> <br/>
            </div>
            <div className="create-post-detail">
            Title <input type="text" name="song" placeholder="Song" value={this.state.song} onChange={this.handleChange}/> <br/>
            </div>
            <button>Try It</button>
          </div>
        </form>
      </div>
        }

        {lyrics && 
        <div>
          <div>
            <form>
              Guess Lyric
              <input type="text" name="guess" onChange={this.handleChange} />
            </form>
          </div>
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
      artist: state.artist
  }
}

export default withRouter(
  connect(mapStateToProps)(App)
);
