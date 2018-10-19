/* global SANGO2_API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../../../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const DISCOUNT_RECEIVE = 'DISCOUNT_RECEIVE'
const DISCOUNT_REQUEST = 'DISCOUNT_REQUEST'
const DISCOUNT_CLEAR = 'DISCOUNT_CLEAR'
const DISCOUNT_REQUEST_ERR = 'DISCOUNT_REQUEST_ERR'

// ------------------------------------
// Actions
// ------------------------------------

function requestDiscount() {
  return {
    type: DISCOUNT_REQUEST
  }
}

function receiveDiscount(data) {
  return {
    type: DISCOUNT_RECEIVE,
    payload: data
  }
}

function clearDiscount() {
  return {
    type: DISCOUNT_CLEAR
  }
}

function requestErr(data) {
  return {
    type: DISCOUNT_REQUEST_ERR,
    payload: data
  }
}

function fetchDiscount(values) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().discount.fetching) {
      return
    }
    dispatch(requestDiscount())
    let url = `${SANGO2_API_HOST}/products/${values.productId}/servers/${values.serverId}/activitys/${values.templateId}`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveDiscount(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  clearDiscount,
  fetchDiscount
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DISCOUNT_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [DISCOUNT_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload.data.domainObject
    })
  },
  [DISCOUNT_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      list: [],
      error: null
    })
  },
  [DISCOUNT_REQUEST_ERR]: (state, action) => {
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
  list: [],
  error: null
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
