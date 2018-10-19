/* global SANGO2_API_HOST */
import axios from 'axios'

import openNotificationWithIcon from '../../../../../components/notification'
import alertInfo from '../components/alert'
// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_LOG_PRODUCES = 'RECEIVE_LOG_PRODUCES'
const REQUEST_LOG_PRODUCES = 'REQUEST_LOG_PRODUCES'
const CLEAR_LOG_PRODUCES = 'CLEAR_LOG_PRODUCES'

const REQUEST_EXPORT_LOG_PRODUCES = 'REQUEST_EXPORT_LOG_PRODUCES'
const RECEIVE_EXPORT_LOG_PRODUCES = 'RECEIVE_EXPORT_LOG_PRODUCES'

const REQUEST_ERR_PRODUCES = 'REQUEST_ERR_PRODUCES'

const RECEIVE_PRODUCE_SOURCES = 'RECEIVE_PRODUCE_SOURCES'
const CLEAR_PRODUCE_SOURCES = 'CLEAR_PRODUCE_SOURCES'

const SOURCES_ERR = 'SOURCES_ERR'

const KEEP_INITIAL_PRODUCE = 'KEEP_INITIAL_PRODUCE'
// ------------------------------------
// Produces
// ------------------------------------

function requestLogProduces() {
  return {
    type: REQUEST_LOG_PRODUCES
  }
}

function receiveLogProduces(data) {
  return {
    type: RECEIVE_LOG_PRODUCES,
    payload: data
  }
}

function clearLogProduces() {
  return {
    type: CLEAR_LOG_PRODUCES
  }
}

function requestExportLogProduces() {
  return {
    type: REQUEST_EXPORT_LOG_PRODUCES
  }
}

function receiveExportLogProduces(item) {
  return {
    type: RECEIVE_EXPORT_LOG_PRODUCES,
    payload: item
  }
}

function requestErr(data) {
  return {
    type: REQUEST_ERR_PRODUCES,
    payload: data
  }
}

function keepInitial(data) {
  return {
    type: KEEP_INITIAL_PRODUCE,
    payload: data
  }
}

function fetchLogProduces(value = {}) {
  if (value.produceSourcesList.length === 0) {
    value.produceSourcesList = ['']
  }
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().produce.fetching) {
      return
    }
    dispatch(requestLogProduces())
    let url = `${SANGO2_API_HOST}/logs/produces?productId=${value.products[0]}&serverId=${value.products[1]}&produceSource=${value.produceSourcesList[0]}&nickname=${value.nickname}&playerId=${value.playerId}&itemId=${value.itemIds}&pageNum=${value.current ? value.current : 1}&pageSize=${value.pageSize ? value.pageSize : 50}&startTime=${value['range-time-picker'][0].format('YYYY-MM-DD HH:mm:ss')}&endTime=${value['range-time-picker'][1].format('YYYY-MM-DD HH:mm:ss')}`
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
      dispatch(receiveLogProduces(response))
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

function exportLogProduces(value) {
  return (dispatch, getState) => {
    dispatch(requestExportLogProduces())
    openNotificationWithIcon('success', '正在导出,请稍后')
    let url = `${SANGO2_API_HOST}/logs/produces/export/batch`
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
      dispatch(receiveExportLogProduces(response))
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
    type: SOURCES_ERR,
    payload: data
  }
}

function produceSources() {
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
  produceSources,
  clearLogProduces,
  fetchLogProduces,
  exportLogProduces,
  keepInitial
}

// ------------------------------------
// Produce Handlers
// ------------------------------------
const PRODUCE_HANDLERS = {
  [REQUEST_LOG_PRODUCES]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_LOG_PRODUCES]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      produces: action.payload ? action.payload.data : {}
    })
  },
  [CLEAR_LOG_PRODUCES]: (state) => {
    return ({
      ...state,
      fetching: false,
      produces: {},
      error: null
    })
  },
  [REQUEST_EXPORT_LOG_PRODUCES]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_EXPORT_LOG_PRODUCES]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      produces: {}
    })
  },
  [REQUEST_ERR_PRODUCES]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      error: { tips: action.payload.tips }
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
  [KEEP_INITIAL_PRODUCE]: (state, action) => {
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
  produces: {},
  error: null,
  produceSources: {},
  sourceError: null,
  productId: null,
  keeping: {}
}

  export default function(state = initialState, produce) {
  const handler = PRODUCE_HANDLERS[produce.type]

  return handler
    ? handler(state, produce)
    : state
}
