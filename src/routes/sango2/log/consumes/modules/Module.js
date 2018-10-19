/* global SANGO2_API_HOST */
import axios from 'axios'

import openNotificationWithIcon from '../../../../../components/notification'
import alertInfo from '../components/alert'
// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_LOG_CONSUMES = 'RECEIVE_LOG_CONSUMES'
const REQUEST_LOG_CONSUMES = 'REQUEST_LOG_CONSUMES'
const CLEAR_LOG_CONSUMES = 'CLEAR_LOG_CONSUMES'

const REQUEST_EXPORT_LOG_CONSUMES = 'REQUEST_EXPORT_LOG_CONSUMES'
const RECEIVE_EXPORT_LOG_CONSUMES = 'RECEIVE_EXPORT_LOG_CONSUMES'

const REQUEST_ERR_CONSUMES = 'REQUEST_ERR_CONSUMES'

const RECEIVE_CONSUME_SOURCES = 'RECEIVE_CONSUME_SOURCES'
// const CLEAR_CONSUME_SOURCES = 'CLEAR_CONSUME_SOURCES'


// const RECEIVE_PRODUCE_SOURCES = 'RECEIVE_PRODUCE_SOURCES'
// const CLEAR_PRODUCE_SOURCES = 'CLEAR_PRODUCE_SOURCES'

const SOURCES_ERR = 'SOURCES_ERR'
const KEEP_INITIAL_CONSUME = 'KEEP_INITIAL_CONSUME'
// ------------------------------------
// Consumes
// ------------------------------------

function requestLogConsumes() {
  return {
    type: REQUEST_LOG_CONSUMES
  }
}

function receiveLogConsumes(data) {
  return {
    type: RECEIVE_LOG_CONSUMES,
    payload: data
  }
}

function clearLogConsumes() {
  return {
    type: CLEAR_LOG_CONSUMES
  }
}

function requestExportLogConsumes() {
  return {
    type: REQUEST_EXPORT_LOG_CONSUMES
  }
}

function receiveExportLogConsumes(item) {
  return {
    type: RECEIVE_EXPORT_LOG_CONSUMES,
    payload: item
  }
}

function requestErr(data) {
  return {
    type: REQUEST_ERR_CONSUMES,
    payload: data
  }
}

function keepInitial(data) {
  return {
    type: KEEP_INITIAL_CONSUME,
    payload: data
  }
}

function fetchLogConsumes(value) {
  if (value.consumeSourcesList.length === 0) {
    value.consumeSourcesList = ['']
  }
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().consume.fetching) {
      return
    }
    dispatch(requestLogConsumes())
    let url = `${SANGO2_API_HOST}/logs/consumes?productId=${value.products[0]}&serverId=${value.products[1]}&consumeSource=${value.consumeSourcesList[0]}&nickname=${value.nickname}&playerId=${value.playerId}&itemId=${value.itemIds}&pageNum=${value.current ? value.current : 1}&pageSize=${value.pageSize ? value.pageSize : 50}&startTime=${value['range-time-picker'][0].format('YYYY-MM-DD HH:mm:ss')}&endTime=${value['range-time-picker'][1].format('YYYY-MM-DD HH:mm:ss')}`
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
      dispatch(receiveLogConsumes(response))
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

function exportLogConsumes(value) {
  return (dispatch, getState) => {
    dispatch(requestExportLogConsumes())
    openNotificationWithIcon('success', '正在导出,请稍后')
    let url = `${SANGO2_API_HOST}/logs/consumes/export/batch`
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
      dispatch(receiveExportLogConsumes(response))
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

function receiveConsumeSources(data) {
  return {
    type: RECEIVE_CONSUME_SOURCES,
    payload: data
  }
}

function requestSourcesErr(data) {
  return {
    type: SOURCES_ERR,
    payload: data
  }
}

function consumeSources() {
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

export {
  consumeSources,
  exportLogConsumes,
  fetchLogConsumes,
  clearLogConsumes,
  keepInitial
}

// ------------------------------------
// Consume Handlers
// ------------------------------------
const CONSUME_HANDLERS = {
  [REQUEST_LOG_CONSUMES]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_LOG_CONSUMES]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      consumes: action.payload ? action.payload.data : {}
    })
  },
  [CLEAR_LOG_CONSUMES]: (state) => {
    return ({
      ...state,
      fetching: false,
      consumes: {},
      error: null
    })
  },
  [REQUEST_EXPORT_LOG_CONSUMES]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_EXPORT_LOG_CONSUMES]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      consumes: {}
    })
  },
  [REQUEST_ERR_CONSUMES]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      error: { tips: action.payload.tips }
    })
  },
  [RECEIVE_CONSUME_SOURCES]: (state, action) => {
    return ({
      ...state,
      consumeSources: action.payload.data.domainObject
    })
  },
  [SOURCES_ERR]: (state, action) => {
    return ({
      ...state,
      sourceError: { tips: action.payload.tips }
    })
  },
  [KEEP_INITIAL_CONSUME]: (state, action) => {
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
  consumes: {},
  error: null,
  consumeSources: {},
  sourceError: null,
  productId: null,
  keeping: {}
}

  export default function(state = initialState, consume) {
  const handler = CONSUME_HANDLERS[consume.type]

  return handler
    ? handler(state, consume)
    : state
}
