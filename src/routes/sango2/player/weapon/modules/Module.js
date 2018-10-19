/* global SANGO2_API_HOST */
import axios from 'axios'

import openNotificationWithIcon from '../../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_WEAPON = 'REQUEST_WEAPON'
const RECEIVE_WEAPON = 'RECEIVE_WEAPON'

const KEEPING_WEAPON = 'KEEPING_WEAPON'

// ------------------------------------
// Actions
// ------------------------------------
function requestWeapons () {
  return {
    type: REQUEST_WEAPON
  }
}
function receiveWeapons (data) {
  return {
    type: RECEIVE_WEAPON,
    payload: data

  }
}
function keepWeapon(data) {
  return {
    type: KEEPING_WEAPON,
    payload: data
  }
}

function fetchWeapons(data) {
  return (dispatch, getState) => {

    dispatch(requestWeapons())
    let url = `${SANGO2_API_HOST}/products/${data.path.products[0]}/servers/${data.path.products[1]}/players/weapon`
    axios({
      method: 'GET',
      url: url,
      params: data.params,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveWeapons(response))
    }).catch(error => {
      if (error.response) {
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchWeapons,
  keepWeapon
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_WEAPON]: (state) => {
    return ({
      ...state,
      fetching: true,
      list: []
    })
  },
  [RECEIVE_WEAPON]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload.data.domainObject || []
    })
  },
  [KEEPING_WEAPON]: (state, action) => {
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
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
