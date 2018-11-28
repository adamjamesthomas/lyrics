import {
    RECEIVE_LYRICS,
    SET_SONG,
    GUESS,
    START_LOAD
} from '../actions/types.js'

const initialLyricsState = {
    artist: [],
    title: [],
    lyrics: [],
    hasSong: false,
    loading: false,
    guess: ""
}

function posts (state = initialLyricsState, action) {
    var updatedComments;
    var updatedPosts;
    switch (action.type) {
        case START_LOAD :
        return {
            ...state,
            loading: state.loading.concat(action.loadType)
        }
        case SET_SONG :
        if (action.hasSong) {
            return {
                ...state,
                hasSong: action.hasSong,
                artist: action.artist,
                song: action.song
            }
        } else {
            return {
                ...state,
                hasSong: action.hasSong,
                artist: "",
                song: ""
            }
        }
        
        case RECEIVE_LYRICS :
        console.log(action)
        var lyrics = action.lyrics.lyric.replace(/\n/g, " ").split(" ")
        var words = []
        lyrics.forEach(function(word, i) {
            var newWord = {
                lyric: word,
                display: "",
                guessed: false,
                id: i
            }
            words.push(newWord)
        });
        console.log(lyrics)
        console.log(words)
        return {
            ...state, 
            lyrics: words
        }
        case GUESS :

            var newLyrics = state.lyrics.slice()
            var isSuccess = false
            var newGuess = action.guess
            newLyrics.forEach(word => {
                if (word.lyric == newGuess && word.guessed == false) {
                  console.log("guess worked")
                  word.guessed = true
                  word.display = word.lyric
                  isSuccess = true
                }
              })
              if (isSuccess) {
                  newGuess = ""
              }
        return {
            ...state,
            lyrics: newLyrics,
            guess: newGuess
        }
        default :
        return state
    }
}

export default posts