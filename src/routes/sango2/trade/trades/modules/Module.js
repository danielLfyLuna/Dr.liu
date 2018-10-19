/* global SANGO2_API_HOST */
import axios from 'axios'
import _ from 'lodash'

import openNotificationWithIcon from '../../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const TRADE_LIST_REQUEST = 'TRADE_LIST_REQUEST'
const TRADE_LIST_REQUEST_ERR = 'TRADE_LIST_REQUEST_ERR'
const TRADE_LIST_RECEIVE = 'TRADE_LIST_RECEIVE'
const TRADE_LIST_CLEAR = 'TRADE_LIST_CLEAR'

const TRADE_CHECK_REQUEST = 'TRADE_CHECK_REQUEST'
const TRADE_CHECK_REQUEST_ERR = 'TRADE_CHECK_REQUEST_ERR'
const TRADE_CHECK_RECEIVE = 'TRADE_CHECK_RECEIVE'

const TRADE_EXPORT_ERR = 'TRADE_EXPORT_ERR'
const TRADE_EXPORT_RECEIVE = 'TRADE_EXPORT_RECEIVE'

const TRADE_KEEPING = 'TRADE_KEEPING'

// ------------------------------------
// Actions
// ------------------------------------

function requestTrades() {
  return {
    type: TRADE_LIST_REQUEST
  }
}

function requestTradesErr(data) {
  return {
    type: TRADE_LIST_REQUEST_ERR,
    payload: data
  }
}

function receiveTrades(data) {
  return {
    type: TRADE_LIST_RECEIVE,
    payload: data
  }
}

function clearTrades() {
  return {
    type: TRADE_LIST_CLEAR
  }
}

function requestCheckTrade() {
  return {
    type: TRADE_CHECK_REQUEST
  }
}

function requestCheckTradeErr(data) {
  return {
    type: TRADE_CHECK_REQUEST_ERR,
    payload: data
  }
}

function receiveCheckTrade(data) {
  return {
    type: TRADE_CHECK_RECEIVE,
    payload: data
  }
}

function exportTradeErr(data) {
  return {
    type: TRADE_EXPORT_ERR,
    payload: data
  }
}

function exportTradeReceive(data) {
  return {
    type: TRADE_EXPORT_RECEIVE,
    payload: data
  }
}

function keepTrade(data) {
  return {
    type: TRADE_KEEPING,
    payload: data
  }
}

function fetchTrades(data) {
  return (dispatch, getState) => {

    dispatch(requestTrades())
    let url = `${SANGO2_API_HOST}/products/${data.products.productId}/servers/${data.products.serverId}/trade/selectTradeData`
    return axios({
      method: 'GET',
      url: url,
      params: data.data,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveTrades(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestTradesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function checkTrade(data) {
  return (dispatch, getState) => {

    dispatch(requestCheckTrade())
    let url = `${SANGO2_API_HOST}/products/${data.products.productId}/servers/${data.products.serverId}/trade/${data.send.id}`
    return axios({
      method: 'PUT',
      data: data.send,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveCheckTrade(response))
      openNotificationWithIcon('success', response.data.msg)
    }).catch(error => {
      if (error.response) {
        dispatch(requestCheckTradeErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function exportTrade(data) {
  return (dispatch, getState) => {

    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/trade/export`
    return axios({
      method: 'GET',
      params: data.params,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(exportTradeReceive(response))
      if (response.data.downloadLink) {
        window.open(`${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/trade/${response.data.downloadLink}`)
      } else {
        openNotificationWithIcon('success', '没有符合条件的数据记录')
      }
    }).catch(error => {
      if (error.response) {
        dispatch(exportTradeErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  clearTrades,
  fetchTrades,
  checkTrade,
  exportTrade,
  keepTrade
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TRADE_LIST_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [TRADE_LIST_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload.data
    })
  },
  [TRADE_LIST_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      list: {}
    })
  },
  [TRADE_LIST_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.tips }
    })
  },
  [TRADE_CHECK_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {}
    })
  },
  [TRADE_CHECK_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.tips } : {}
    })
  },
  [TRADE_CHECK_RECEIVE]: (state, action) => {
    let list = [...state.list.trades]
    const trade = action.payload.data.domainObject
    const check = { id: trade.id, mapping: trade.mapping, status: trade.status }
    _.map(list, (val, index) => {
      if (action.payload.data.isSuccess && val.id === check.id) {
        val = Object.assign(val, check)
      }
    })
    return ({
      ...state,
      fetching: false,
      list: {
        ...state.list,
        trades: [...list]
      },
      check: action.payload.data
    })
  },
  [TRADE_EXPORT_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.tips } : {}
    })
  },
  [TRADE_EXPORT_RECEIVE]: (state, action) => {
    return ({
      ...state
    })
  },
  [TRADE_KEEPING]: (state, action) => {
    return ({
      ...state,
      keeping: {
        ...state.keeping,
        ...action.payload
      }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  err: false,
  errMes: {},
  list: {},
  check: {},
  keeping: {}
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
