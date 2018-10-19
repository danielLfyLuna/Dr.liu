/* global SANGO2_API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../../../../../components/notification'
// ------------------------------------
// Constants
// ------------------------------------
const CHARGELOG_REQUEST = 'CHARGELOG_REQUEST'
const CHARGELOG_ERR = 'CHARGELOG_ERR'
const CHARGELOG_RECEIVE = 'CHARGELOG_RECEIVE'

const CHARGELOG_EXPORT_REQUEST = 'CHARGELOG_EXPORT_REQUEST'
const CHARGELOG_EXPORT_RECEIVE = 'CHARGELOG_EXPORT_RECEIVE'
// ------------------------------------
// Actions
// ------------------------------------

function requestChargeLog() {
  return {
    type: CHARGELOG_REQUEST
  }
}

function chargeLogErr(data) {
  return {
    type: CHARGELOG_ERR,
    payload: data
  }
}

function receiveChargeLog(data) {
  return {
    type: CHARGELOG_RECEIVE,
    payload: data
  }
}

function requestExport() {
  return {
    type: CHARGELOG_EXPORT_REQUEST
  }
}

function receiveExport() {
  return {
    type: CHARGELOG_EXPORT_RECEIVE
  }
}

function getChargeLog(val) {
  return (dispatch, getState) => {
    dispatch(requestChargeLog())
    let url = `${SANGO2_API_HOST}/products/_/servers/_/pay/rechargelog`
    axios({
      method: 'GET',
      url: url,
      params: val,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveChargeLog(response))
    }).catch(error => {
      if (error.response) {
        dispatch(chargeLogErr(error))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function exportChargeLog(val) {
  return (dispatch, getState) => {
    dispatch(requestExport())
    let url = `${SANGO2_API_HOST}/products/_/servers/_/pay/rechargelog/export`
    axios({
      method: 'GET',
      url: url,
      params: val,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveExport(response))
      if (response.data.downloadLink) {
        window.open(`${SANGO2_API_HOST}/products/_/servers/_/pay/${response.data.downloadLink}`)
      }
    }).catch(error => {
      if (error.response) {
        dispatch(chargeLogErr(error))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  getChargeLog,
  exportChargeLog
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHARGELOG_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      list: []
    })
  },
  [CHARGELOG_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: { tips: action.payload.response.data.tips }
    })
  },
  [CHARGELOG_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload.data.domainObject || []
    })
  },
  [CHARGELOG_EXPORT_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [CHARGELOG_EXPORT_RECEIVE]: (state) => {
    return ({
      ...state,
      fetching: false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  err: {},
  list: []
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
