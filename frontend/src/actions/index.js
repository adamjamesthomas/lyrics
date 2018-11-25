import * as LyricsAPI from '../utils/LyricsAPI.js'
import {
    RECEIVE_LYRICS,
    START_LOAD
} from './types.js'


export function startLoad (loadType) {
    return {
        type: START_LOAD,
        loadType
    }
}
export const getLyrics  = (artist, title) => dispatch => {
    LyricsAPI.getAllPosts()
    .then(lyrics => dispatch(receiveLyrics(lyrics)))  
}

export function receiveLyrics (lyrics) {
    return {
        type: RECEIVE_LYRICS,
        lyrics
    }
}

