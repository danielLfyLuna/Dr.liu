/* global SANGO2_API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../../../../../components/notification'

import {singOut} from '../../../../../modules/login'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_RESET_ARMY = 'REQUEST_RESET_ARMY'
const RECEIVE_RESET_ARMY = 'RECEIVE_RESET_ARMY'

const KEEPING_RESET_ARMY = 'KEEPING_RESET_ARMY'

// ------------------------------------
// Actions
// ------------------------------------

function requestResetArmy () {
  return {
    type: REQUEST_RESET_ARMY
  }
}
function receiveResetArmy () {
  return {
    type: RECEIVE_RESET_ARMY
  }
}
function keepResetArmy(data) {
  return {
    type: KEEPING_RESET_ARMY,
    payload: data
  }
}

function resetArmyActionCreator(value = {}) {
  return (dispatch) => {
    dispatch(requestResetArmy())
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/servers/${value.products[1]}/players/resetarmy`
    axios({
      method: 'put',
      url: url,
      headers: {
        'productId': value.products[0],
        'serverId': value.products[1],
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      },
      data: value.list
    }).then(data => {
      dispatch(receiveResetArmy(data.data.domainObject))
      openNotificationWithIcon('info', data.data.msg)
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('error', '登录过期', error.response.data.message, 3)
          dispatch(singOut())
        }
        if (error.response.data.error) {
          openNotificationWithIcon('error', error.response.data.status, error.response.data.message, 10)
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
  resetArmyActionCreator,
  keepResetArmy
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_RESET_ARMY]: () => {
    return ({
      fetching: true
    })
  },
  [RECEIVE_RESET_ARMY]: () => {
    return ({
      fetching: false
    })
  },
  [KEEPING_RESET_ARMY]: (state, action) => {
    // console.log(action.payload)
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
