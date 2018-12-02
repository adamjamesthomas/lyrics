import {
    RECEIVE_LYRICS,
    SET_SONG,
    GUESS,
    START_LOAD,
    START_RUN,
    TICK
} from '../actions/types.js'

const initialLyricsState = {
    artist: [],
    title: [],
    lyrics: [],
    hasSong: false,
    loading: false,
    guess: "",
    numGuessed: 0,
    numTotal: 0,
    isRunning: false,
    isVictory: false,
    finalMinutes: 0,
    finalSeconds: 0,
    elapsedTime: 0,
    seconds: 0,
    minutes: 0,
    timer: null
}

function posts (state = initialLyricsState, action) {
    var updatedComments;
    var updatedPosts;
    console.log(action.type)
    switch (action.type) {
        case START_LOAD :
        return {
            ...state,
            loading: state.loading.concat(action.loadType)
        }
        case SET_SONG :
        if (action.hasSong) {
            return {
                ...initialLyricsState,
                hasSong: action.hasSong,
                artist: action.artist,
                title: action.song,
            }
        } else {
            return {
                ...state,
                hasSong: action.hasSong,
                artist: "",
                title: ""
            }
        }
        case START_RUN :
            
            return {
                ...state,
                isRunning: true,
                timer: action.timer
            }
        
        case RECEIVE_LYRICS :
        console.log(action)
        var lyrics = action.lyrics.lyric.replace(/\n/g, " ").split(" ")
        var words = []
        lyrics.forEach(function(word, i) {
            var cleanWord = word.toLowerCase()
            cleanWord = cleanWord.replace(/\W/g, '')
            var newWord = {
                cleanWord: cleanWord,
                lyric: word,
                display: "",
                guessed: false,
                id: i
            }
            if (cleanWord.length > 0){
                words.push(newWord)
            }
        });
        console.log(lyrics)
        console.log(words)
        return {
            ...state, 
            lyrics: words,
            numTotal: words.length,

        }
        case GUESS :


            var newLyrics = state.lyrics.slice()
            

            
            var isSuccess = false //for tracking whether guess was successful
            var newGuess = action.guess
            var numGuessCounter = state.numGuessed //running total of lyrics guessed correctly
            newLyrics.forEach(word => {
                if (word.cleanWord == newGuess && word.guessed == false) {
                  numGuessCounter++
                  word.guessed = true
                  word.display = word.lyric
                  isSuccess = true
                }
              })
              if (isSuccess) {
                  newGuess = ""
                  if (numGuessCounter == state.numTotal) {
                    return {
                        ...state,
                        lyrics: newLyrics,
                        guess: newGuess,
                        numGuessed: numGuessCounter,
                        isVictory: true,
                        isRunning: false,
                        finalMinutes: state.minutes,
                        finalSeconds: state.seconds
                    }
                  }
              }
        return {
            ...state,
            lyrics: newLyrics,
            guess: newGuess,
            numGuessed: numGuessCounter
        }
        case TICK :
            if(state.isRunning) {
                var seconds = state.elapsedTime + 1
                var minutes = Math.floor(seconds  / 60)
                seconds = seconds - minutes * 60
                return {
                    ...state,
                    elapsedTime: state.elapsedTime + 1,
                    seconds: seconds,
                    minutes: minutes
                }
            }
        default :
        return state
    }
}

export default posts