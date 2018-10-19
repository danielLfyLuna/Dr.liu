/* global SANGO2_API_HOST */
import axios from 'axios'

import openNotificationWithIcon from '../../../../../components/notification'
// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_LOG_ACTIONS = 'RECEIVE_LOG_ACTIONS'
const REQUEST_LOG_ACTIONS = 'REQUEST_LOG_ACTIONS'
const CLEAR_LOG_ACTIONS = 'CLEAR_LOG_ACTIONS'

const REQUEST_EXPORT_LOG_ACTIONS = 'REQUEST_EXPORT_LOG_ACTIONS'
const RECEIVE_EXPORT_LOG_ACTIONS = 'RECEIVE_EXPORT_LOG_ACTIONS'

const REQUEST_ERR = 'REQUEST_ERR'

const RECEIVE_OPERATION_TYPE = 'RECEIVE_OPERATION_TYPE'
const CLEAR_OPERATION_TYPE = 'CLEAR_OPERATION_TYPE'

const RECEIVE_CONSUME_SOURCES = 'RECEIVE_CONSUME_SOURCES'
const CLEAR_CONSUME_SOURCES = 'CLEAR_CONSUME_SOURCES'

const RECEIVE_PRODUCE_SOURCES = 'RECEIVE_PRODUCE_SOURCES'
const CLEAR_PRODUCE_SOURCES = 'CLEAR_PRODUCE_SOURCES'

const SOURCES_ERR = 'SOURCES_ERR'

const KEEP_INITIAL_ACTION = 'KEEP_INITIAL_ACTION'
// ------------------------------------
// Actions
// ------------------------------------

function requestLogActions() {
  return {
    type: REQUEST_LOG_ACTIONS
  }
}

function receiveLogActions(data) {
  return {
    type: RECEIVE_LOG_ACTIONS,
    payload: data
  }
}

export function clearLogActions() {
  return {
    type: CLEAR_LOG_ACTIONS
  }
}

function requestExportLogActions() {
  return {
    type: REQUEST_EXPORT_LOG_ACTIONS
  }
}

export function keepInitial(data) {
  return {
    type: KEEP_INITIAL_ACTION,
    payload: data
  }
}

function receiveExportLogActions(item) {
  const data = window.open(`${SANGO2_API_HOST}/${item.data.downloadLink}`)
  return {
    type: RECEIVE_EXPORT_LOG_ACTIONS,
    payload: data
  }
}

function requestErr(data) {
  return {
    type: REQUEST_ERR,
    payload: data
  }
}

export function fetchLogActions(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().action.fetching) {
      return
    }
    dispatch(requestLogActions())
    let url = `${SANGO2_API_HOST}/logs/actions?productId=${value.products[0]}&serverId=${value.products[1]}&consumeSource=${value.consumeSourcesList}&produceSource=${value.produceSourcesList}&operationType=${value.operationSourcesList}&nickname=${value.nickname}&playerId=${value.playerId}&startTime=${value.startTime}`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        // 'productId': value.products[0],
        // 'serverId': value.products[1],
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveLogActions(response))
      if (response.data.domainObject.length == 0) {
        openNotificationWithIcon('success', '查询成功，没有相关数据')
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', '查询失败', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export function exportLogActions(values) {
  return (dispatch, getState) => {
    dispatch(requestExportLogActions())
    openNotificationWithIcon('success', '正在导出,请稍后')
    let url = `${SANGO2_API_HOST}/logs/actions/export`
    return axios({
      method: 'POST',
      data: values.list,
      url: url,
      headers: {
        // 'productId': values.products[0],
        // 'serverId': values.products[1],
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveExportLogActions(response))
      openNotificationWithIcon('success', '导出成功')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', '导出失败', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export function clearOperationType() {
  return {
    type: CLEAR_OPERATION_TYPE
  }
}

function receiveOperationType(data) {
  return {
    type: RECEIVE_OPERATION_TYPE,
    payload: data
  }
}

export function clearConsumeSources() {
  return {
    type: CLEAR_CONSUME_SOURCES
  }
}

function receiveConsumeSources(data) {
  return {
    type: RECEIVE_CONSUME_SOURCES,
    payload: data
  }
}

export function clearProduceSources() {
  return {
    type: CLEAR_PRODUCE_SOURCES
  }
}

function receiveProduceSources(data) {
  return {
    type: RECEIVE_PRODUCE_SOURCES,
    payload: data
  }
}

function requestSourcesErr(data) {
  return {
    type: REQUEST_ERR,
    payload: data
  }
}

export function fetchOperationType() {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/logs/logsource/3`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveOperationType(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestSourcesErr(error.response.data))
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export function fetchConsumeSources() {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/logs/logsource/2`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveConsumeSources(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestSourcesErr(error.response.data))
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export function fetchProduceSources() {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/logs/logsource/1`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveProduceSources(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestSourcesErr(error.response.data))
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_LOG_ACTIONS]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_LOG_ACTIONS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      actions: action.payload ? action.payload.data.domainObject : []
    })
  },
  [CLEAR_LOG_ACTIONS]: (state) => {
    return ({
      ...state,
      consumeSources: [],
      operationType: [],
      produceSources: [],
      fetching: false,
      actions: [],
      error: null,
      sourceError: null
    })
  },
  [REQUEST_EXPORT_LOG_ACTIONS]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_EXPORT_LOG_ACTIONS]: (state) => {
    return ({
      ...state,
      fetching: false,
      actions: []
    })
  },
  [REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      error: { tips: action.payload.tips }
    })
  },
  [CLEAR_OPERATION_TYPE]: (state) => {
    return ({
      ...state,
      operationType: [],
      sourceError: null
    })
  },
  [RECEIVE_OPERATION_TYPE]: (state, action) => {
    return ({
      ...state,
      operationType: action.payload.data.domainObject
    })
  },
  [CLEAR_CONSUME_SOURCES]: (state) => {
    return ({
      ...state,
      consumeSources: [],
      sourceError: null
    })
  },
  [RECEIVE_CONSUME_SOURCES]: (state, action) => {
    return ({
      ...state,
      consumeSources: action.payload.data.domainObject
    })
  },
  [CLEAR_PRODUCE_SOURCES]: (state) => {
    return ({
      ...state,
      produceSources: [],
      sourceError: null
    })
  },
  [RECEIVE_PRODUCE_SOURCES]: (state, action) => {
    return ({
        ...state,
        produceSources: action.payload.data.domainObject
    })
  },
  [SOURCES_ERR]: (state, action) => {
    return ({
      ...state,
      sourceError: { tips: action.payload.tips }
    })
  },
  [KEEP_INITIAL_ACTION]: (state, action) => {
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
  actions: [],
  error: null,
  consumeSources: [],
  operationType: [],
  produceSources: [],
  sourceError: null,
  productId: null,
  keeping: {}
}

  export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
