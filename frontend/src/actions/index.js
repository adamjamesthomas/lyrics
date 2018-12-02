import * as LyricsAPI from '../utils/LyricsAPI.js'
import {
    RECEIVE_LYRICS,
    SET_SONG,
    START_LOAD,
    GUESS,
    START_RUN,
    TICK
} from './types.js'


export function startLoad (loadType) {
    return {
        type: START_LOAD,
        loadType
    }
}
export function tick () {
    return {
        type: TICK
    }
}
export const getLyrics  = (artist, title) => dispatch => {
    console.log(artist)
    console.log(title)
    LyricsAPI.getLyrics(artist, title)
    .then(lyrics => dispatch(receiveLyrics(lyrics)))  
}

export function setSong (hasSong, artist = "", song = "") {
    return {
        type: SET_SONG,
        hasSong,
        artist,
        song
    }
}
export function startRun (timer) {
    return {
        type: START_RUN,
        timer
    }
}
export function guess (guess) {
    return {
        type: GUESS,
        guess
    }
}
export function receiveLyrics (lyrics) {
    return {
        type: RECEIVE_LYRICS,
        lyrics
    }
}

