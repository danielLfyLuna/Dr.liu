/* global SANGO2_API_HOST */
import axios from 'axios'

import openNotificationWithIcon from '../../../../../components/notification'
import {singOut} from '../../../../../modules/login'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_SOLDIERS = 'REQUEST_SOLDIERS'
const RECEIVE_SOLDIERS = 'RECEIVE_SOLDIERS'

const KEEPING_SOLDIERS = 'KEEPING_SOLDIERS'

// ------------------------------------
// Actions
// ------------------------------------
function requestSoldiers () {
  return {
    type: REQUEST_SOLDIERS
  }
}
function receiveSoldiers (list) {
  return {
    type: RECEIVE_SOLDIERS,
    data: list
  }
}
function keepSoldiers(data) {
  return {
    type: KEEPING_SOLDIERS,
    payload: data
  }
}

function fetchSoldiers(value) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', value)

    dispatch(requestSoldiers())
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/servers/${value.products[1]}/players/soldiers`
    axios({
      method: 'get',
      url: url,
      // data: {
      //   ID: 12345
      // },
      params: {
        nickname: value.nickname,
        playerId: value.playerId
      },
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      dispatch(receiveSoldiers(data.data.domainObject))
      // openNotificationWithIcon('success', data.data.msg)
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('warning', '登录过期', error.response.data.message, 3)
          dispatch(singOut())
        } else {
          openNotificationWithIcon('warning', '失败', error.response.data.tips, 3)
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
  fetchSoldiers,
  keepSoldiers
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_SOLDIERS]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_SOLDIERS]: (state, action) => {
    return ({
      ...state,
      list: Object.assign({}, action.data),
      fetching: false
    })
  },
  [KEEPING_SOLDIERS]: (state, action) => {
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
  list: [],
  keeping: {}
}
export default function mailsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
