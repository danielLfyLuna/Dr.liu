/* global SANGO2_API_HOST */
import axios from 'axios'
// import _ from 'lodash'

import openNotificationWithIcon from '../../../../../components/notification'

import { fetchItemPrice } from '../../../../../modules/itemPrice'

// ------------------------------------
// Constants
// ------------------------------------
const ITEMMAX_PRICE_REQUEST = 'ITEMMAX_PRICE_REQUEST'
const ITEMMAX_PRICE_RECEIVE = 'ITEMMAX_PRICE_RECEIVE'

const ITEMMAX_EXCEL_REQUEST = 'ITEMMAX_EXCEL_REQUEST'
const ITEMMAX_EXCEL_RECEIVE = 'ITEMMAX_EXCEL_RECEIVE'

const ITEMMAX_ERR = 'ITEMMAX_ERR'


// ------------------------------------
// Actions
// ------------------------------------

function requestItemMax() {
  return {
    type: ITEMMAX_PRICE_REQUEST
  }
}

function receiveItemMax(data) {
  return {
    type: ITEMMAX_PRICE_RECEIVE,
    payload: data
  }
}

function requestItemMaxUp() {
  return {
    type: ITEMMAX_EXCEL_REQUEST
  }
}

function receiveItemMaxUp(data) {
  return {
    type: ITEMMAX_EXCEL_RECEIVE,
    payload: data
  }
}

function itemMaxErr(data) {
  return {
    type: ITEMMAX_ERR,
    payload: data
  }
}

function updateItemMax(data) {
  return (dispatch, getState) => {

    dispatch(requestItemMax())
    let url = `${SANGO2_API_HOST}/products/_/items/updateItem`
    return axios({
      method: 'PUT',
      url: url,
      data: data,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveItemMax(response))
      dispatch(fetchItemPrice())
      openNotificationWithIcon('success', '成功')
    }).catch(error => {
      if (error.response) {
        dispatch(itemMaxErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function uploadItemMax(data) {
  return (dispatch, getState) => {

    dispatch(requestItemMaxUp())
    let url = `${SANGO2_API_HOST}/products/_/items/uploadItemPrice`
    return axios({
      method: 'POST',
      data: data,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveItemMaxUp(response))
      openNotificationWithIcon('success', '成功')
    }).catch(error => {
      if (error.response) {
        dispatch(itemMaxErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  updateItemMax,
  uploadItemMax
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ITEMMAX_PRICE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [ITEMMAX_PRICE_RECEIVE]: (state, action) => {
    console.log(action.payload)
    return ({
      ...state,
      fetching: false,
      list: action.payload.data
    })
  },
  [ITEMMAX_EXCEL_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [ITEMMAX_EXCEL_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      excel: action.payload.data
    })
  },
  [ITEMMAX_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: action.payload ? { tips: action.payload.tips } : null
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  err: null,
  list: {},
  excel: {}
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
