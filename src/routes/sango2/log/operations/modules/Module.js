/* global SANGO2_API_HOST */
import axios from 'axios'

import openNotificationWithIcon from '../../../../../components/notification'
import alertInfo from '../components/alert'
// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_LOG_OPERATIONS = 'RECEIVE_LOG_OPERATIONS'
const REQUEST_LOG_OPERATIONS = 'REQUEST_LOG_OPERATIONS'
const CLEAR_LOG_OPERATIONS = 'CLEAR_LOG_OPERATIONS'

const REQUEST_EXPORT_LOG_OPERATIONS = 'REQUEST_EXPORT_LOG_OPERATIONS'
const RECEIVE_EXPORT_LOG_OPERATIONS = 'RECEIVE_EXPORT_LOG_OPERATIONS'

const REQUEST_ERR = 'REQUEST_ERR'

const RECEIVE_OPERATION_SOURCES = 'RECEIVE_OPERATION_SOURCES'
const CLEAR_OPERATION_SOURCES = 'CLEAR_OPERATION_SOURCES'

const SOURCES_ERR = 'SOURCES_ERR'

const KEEP_INITIAL_OPERATION = 'KEEP_INITIAL_OPERATION'
// ------------------------------------
// Operations
// ------------------------------------

function requestLogOperations() {
  return {
    type: REQUEST_LOG_OPERATIONS
  }
}

function receiveLogOperations(data) {
  return {
    type: RECEIVE_LOG_OPERATIONS,
    payload: data
  }
}

function clearLogOperations() {
  return {
    type: CLEAR_LOG_OPERATIONS
  }
}

function requestExportLogOperations() {
  return {
    type: REQUEST_EXPORT_LOG_OPERATIONS
  }
}

function receiveExportLogOperations(item) {
  return {
    type: RECEIVE_EXPORT_LOG_OPERATIONS,
    payload: item
  }
}

function requestErr(data) {
  return {
    type: REQUEST_ERR,
    payload: data
  }
}

function keepInitial(data) {
  return {
    type: KEEP_INITIAL_OPERATION,
    payload: data
  }
}

function fetchLogOperations(value = {}) {
  if (value.operationSourcesList.length === 0) {
    value.operationSourcesList = ['']
  }
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().operation.fetching) {
      return
    }
    dispatch(requestLogOperations())
    let url = `${SANGO2_API_HOST}/logs/operations?productId=${value.products[0]}&serverId=${value.products[1]}&operationType=${value.operationSourcesList[0]}&nickname=${value.nickname}&playerId=${value.playerId}&pageNum=${value.current ? value.current : 1}&pageSize=${value.pageSize ? value.pageSize : 50}&startTime=${value['range-time-picker'][0].format('YYYY-MM-DD HH:mm:ss')}&endTime=${value['range-time-picker'][1].format('YYYY-MM-DD HH:mm:ss')}`
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
      dispatch(receiveLogOperations(response))
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

function exportLogOperations(value) {
  return (dispatch, getState) => {
    dispatch(requestExportLogOperations())
    openNotificationWithIcon('success', '正在导出,请稍后')
    let url = `${SANGO2_API_HOST}/logs/operations/export/batch`
    return axios({
      method: 'POST',
      data: value.list,
      url: url,
      headers: {
        // 'productId': value.list.productId,
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveExportLogOperations(response))
      openNotificationWithIcon('success', '导出成功')
      alertInfo(response)
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

function receiveOperationSources(data) {
  return {
    type: RECEIVE_OPERATION_SOURCES,
    payload: data
  }
}

function requestSourcesErr(data) {
  return {
    type: REQUEST_ERR,
    payload: data
  }
}

function operationSources() {
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
      dispatch(receiveOperationSources(response))
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
  fetchLogOperations,
  exportLogOperations,
  operationSources,
  clearLogOperations,
  keepInitial
}

// ------------------------------------
// Operation Handlers
// ------------------------------------
const OPERATION_HANDLERS = {
  [REQUEST_LOG_OPERATIONS]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_LOG_OPERATIONS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      operations: action.payload ? action.payload.data : {}
    })
  },
  [CLEAR_LOG_OPERATIONS]: (state) => {
    return ({
      ...state,
      fetching: false,
      operations: {},
      error: null
    })
  },
  [REQUEST_EXPORT_LOG_OPERATIONS]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_EXPORT_LOG_OPERATIONS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      operations: {}
    })
  },
  [REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      error: { tips: action.payload.tips }
    })
  },
  [CLEAR_OPERATION_SOURCES]: (state) => {
    return ({
      ...state,
      operationSources: [],
      sourceError: null
    })
  },
  [RECEIVE_OPERATION_SOURCES]: (state, action) => {
    return ({
      ...state,
      operationSources: action.payload.data.domainObject
    })
  },
  [SOURCES_ERR]: (state, action) => {
    return ({
      ...state,
      sourceError: { tips: action.payload.tips }
    })
  },
  [KEEP_INITIAL_OPERATION]: (state, action) => {
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
  operations: {},
  error: null,
  operationSources: {},
  sourceError: null,
  productId: null,
  keeping: {}
}

  export default function(state = initialState, operation) {
  const handler = OPERATION_HANDLERS[operation.type]

  return handler
    ? handler(state, operation)
    : state
}
