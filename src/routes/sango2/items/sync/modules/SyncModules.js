/* global SANGO2_API_HOST */
import axios from 'axios'

import openNotificationWithIcon from '../../../../../components/notification'
import {singOut} from '../../../../../modules/login'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_SYNC = 'REQUEST_SYNC'
const RECEIVE_SYNC = 'RECEIVE_SYNC'

const KEEPING_SYNC = 'KEEPING_SYNC'

// ------------------------------------
// Actions
// ------------------------------------
function requestSync () {
  return {
    type: REQUEST_SYNC
  }
}
function receiveSync () {
  return {
    type: RECEIVE_SYNC
  }
}
function keepSync(data) {
  return {
    type: KEEPING_SYNC,
    payload: data
  }
}

function fetchSync(value) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', value)

    dispatch(requestSync())
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/items/servers/${value.products[1]}/synctemplate`
    axios({
      method: 'put',
      url: url,
      data: {
        ID: 12345
      },
      params: {
        ID: 12345
      },
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      dispatch(receiveSync())
      openNotificationWithIcon('success', data.data.msg)
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('warning', '登录过期', error.response.data.message, 3)
          dispatch(singOut())
        }
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchSync,
  keepSync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_SYNC]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_SYNC]: (state) => {
    return ({
      ...state,
      fetching: false
    })
  },
  [KEEPING_SYNC]: (state, action) => {
    return ({
      ...state,
      keeping: Object.assign({}, action.payload)
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  keeping: {}
}
export default function mailsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
