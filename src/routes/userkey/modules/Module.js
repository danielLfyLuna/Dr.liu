/* global API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../../../components/notification'
// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_USERKEY = 'RECEIVE_USERKEY'
const REQUEST_USERKEY = 'REQUEST_USERKEY'
const CLEAR_USERKEY = 'CLEAR_USERKEY'

const USERKEY_REQUEST_ERR = 'USERKEY_REQUEST_ERR'
// ------------------------------------
// Actions
// ------------------------------------

function requestUSERKEY() {
  return {
    type: REQUEST_USERKEY
  }
}

function receiveUSERKEY(data) {
  return {
    type: RECEIVE_USERKEY,
    payload: data
  }
}

function clearUSERKEY() {
  return {
    type: CLEAR_USERKEY
  }
}

function requestErr(data) {
  return {
    type: USERKEY_REQUEST_ERR,
    payload: data
  }
}

function fetchUSERKEY(value) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().userkey.fetching) {
      return
    }
    dispatch(requestUSERKEY())
    let url = `${API_HOST}/userRoles/user/userKey`
    return axios({
      method: 'get',
      url: url,
      params: value,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveUSERKEY(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
        // browserHistory.push('/')
        // dispatch(singOut())
      } else {
        console.log('Error', error.message)
      }
    })
  }
}


export {
  fetchUSERKEY,
  clearUSERKEY
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_USERKEY]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_USERKEY]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload ? action.payload.data : {}
    })
  },
  [CLEAR_USERKEY]: (state) => {
    return ({
      ...state,
      fetching: false,
      list: {},
      error: null
    })
  },
  [USERKEY_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      error: { tips: action.payload.tips }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  list: {},
  error: null
}

  export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
