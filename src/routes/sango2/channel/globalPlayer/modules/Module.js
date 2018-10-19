/* global SANGO2_API_HOST */
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
const GLOBALPLAYERS_RECEIVE = 'GLOBALPLAYERS_RECEIVE'
const GLOBALPLAYERS_REQUEST = 'GLOBALPLAYERS_REQUEST'
const GLOBALPLAYERS_CLEAR = 'GLOBALPLAYERS_CLEAR'
const GLOBALPLAYERS_REQUEST_ERR = 'GLOBALPLAYERS_REQUEST_ERR'

// ------------------------------------
// Actions
// ------------------------------------

function requestGlobalPlayers() {
  return {
    type: GLOBALPLAYERS_REQUEST
  }
}

function receiveGlobalPlayers(data) {
  return {
    type: GLOBALPLAYERS_RECEIVE,
    payload: data
  }
}

function clearGlobalPlayers() {
  return {
    type: GLOBALPLAYERS_CLEAR
  }
}

function requestErr(data) {
  return {
    type: GLOBALPLAYERS_REQUEST_ERR,
    payload: data
  }
}

function fetchGlobalPlayers(values) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().globalPlayer.fetching) {
      return
    }
    // dispatch(clearGlobalPlayers())
    dispatch(requestGlobalPlayers())
    let url = `${SANGO2_API_HOST}/global/players/exist?nickname=${values.nickname}&playerId=${values.playerId}&platformId=${values.platformId}`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveGlobalPlayers(response))
    }).catch(error => {
      if (error) {
        dispatch(requestErr(error))
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  clearGlobalPlayers,
  fetchGlobalPlayers
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GLOBALPLAYERS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [GLOBALPLAYERS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      globalPlayers: action.payload.data.domainObject
    })
  },
  [GLOBALPLAYERS_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      globalPlayers: [],
      error: null
    })
  },
  [GLOBALPLAYERS_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      error: { tips: action.payload.response.data.tips }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  globalPlayers: [],
  error: null
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
