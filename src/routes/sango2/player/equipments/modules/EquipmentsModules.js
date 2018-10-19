/* global SANGO2_API_HOST */
import axios from 'axios'

import openNotificationWithIcon from '../../../../../components/notification'
import {singOut} from '../../../../../modules/login'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_EQUIPMENTS = 'REQUEST_EQUIPMENTS'
const RECEIVE_EQUIPMENTS = 'RECEIVE_EQUIPMENTS'

const KEEPING_EQUIPMENTS = 'KEEPING_EQUIPMENTS'

// ------------------------------------
// Actions
// ------------------------------------
function requestEquipments () {
  return {
    type: REQUEST_EQUIPMENTS
  }
}
function receiveSEquipments (list) {
  return {
    type: RECEIVE_EQUIPMENTS,
    data: list
  }
}
function keepEquipments(data) {
  return {
    type: KEEPING_EQUIPMENTS,
    payload: data
  }
}

function fetchEquipments(value) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', value)

    dispatch(requestEquipments())
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/servers/${value.products[1]}/players/equipments`
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
      dispatch(receiveSEquipments(data.data.domainObject))
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
  fetchEquipments,
  keepEquipments
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_EQUIPMENTS]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_EQUIPMENTS]: (state, action) => {
    return ({
      ...state,
      list: Object.assign({}, action.data),
      fetching: false
    })
  },
  [KEEPING_EQUIPMENTS]: (state, action) => {
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
