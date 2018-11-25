import {
    RECEIVE_LYRICS,
    START_LOAD
} from '../actions/types.js'

const initialLyricsState = {
    artist: [],
    title: [],
    lyrics: [],
    loading: false
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
        case RECEIVE_LYRICS :
        return {
            ...state, 
            lyrics: action.lyrics
        }
        default :
        return state
    }
}

export default posts