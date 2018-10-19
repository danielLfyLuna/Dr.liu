/* global SANGO2_API_HOST */
import axios from 'axios'

import openNotificationWithIcon from '../../../../../components/notification'
import alertInfo from '../components/alert'

// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_SQLS = 'RECEIVE_SQLS'
const REQUEST_SQLS = 'REQUEST_SQLS'
const CLEAR_SQLS = 'CLEAR_SQLS'

const REQUEST_ADD_SQLS = 'REQUEST_ADD_SQLS'
const RECEIVE_ADD_SQLS = 'RECEIVE_ADD_SQLS'

const REQUEST_EXEC_SQLS = 'REQUEST_EXEC_SQLS'
const RECEIVE_EXEC_SQLS = 'RECEIVE_EXEC_SQLS'
const CLEAR_EXEC_SQLS = 'CLEAR_EXEC_SQLS'

const REQUEST_BEFORE_SQLS = 'REQUEST_BEFORE_SQLS'
const RECEIVE_BEFORE_SQLS = 'RECEIVE_BEFORE_SQLS'
const CLEAR_BEFORE_SQLS = 'CLEAR_BEFORE_SQLS'

const REQUEST_EXPORT_SQLS = 'REQUEST_EXPORT_SQLS'
const RECEIVE_EXPORT_SQLS = 'RECEIVE_EXPORT_SQLS'

const REQUEST_ERR = 'REQUEST_ERR'


// ------------------------------------
// Actions
// ------------------------------------

function requestSqls() {
  return {
    type: REQUEST_SQLS
  }
}

function receiveSqls(data) {
  return {
    type: RECEIVE_SQLS,
    payload: data
  }
}

export function clearSqls() {
  return {
    type: CLEAR_SQLS
  }
}

function requestAddSqls() {
  return {
    type: REQUEST_ADD_SQLS
  }
}

function receiveAddSqls(data) {
  return {
    type: RECEIVE_ADD_SQLS,
    payload: data
  }
}

function requestExecSqls() {
  return {
    type: REQUEST_EXEC_SQLS
  }
}

function receiveExecSqls(data) {
  return {
    type: RECEIVE_EXEC_SQLS,
    payload: data
  }
}

export function clearExecSqls() {
  return {
    type: CLEAR_EXEC_SQLS
  }
}

function requestBeforeSqls() {
  return {
    type: REQUEST_BEFORE_SQLS
  }
}

function receiveBeforeSqls(data) {
  return {
    type: RECEIVE_BEFORE_SQLS,
    payload: data
  }
}

export function clearBeforeSqls() {
  return {
    type: CLEAR_BEFORE_SQLS
  }
}

function requestExportSqls() {
  return {
    type: REQUEST_EXPORT_SQLS
  }
}

function receiveExportSqls(data) {
  const item = window.open(`${SANGO2_API_HOST}/${data.data.downloadLink}`)
  return {
    type: RECEIVE_EXPORT_SQLS,
    payload: item
  }
}

function requestErr(data) {
  return {
    type: REQUEST_ERR,
    data: data
  }
}

export function fetchSqls() {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().sql.fetching) {
      return
    }
    dispatch(clearSqls())
    dispatch(requestSqls())
    let url = `${SANGO2_API_HOST}/sqls`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveSqls(response))
      if (response.data.domainObject.length == 0) {
        openNotificationWithIcon('success', '查询成功，没有相关数据')
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export function addSqls(values) {
  return (dispatch, getState) => {
    dispatch(requestAddSqls())
    let url = `${SANGO2_API_HOST}/sqls`
    return axios({
      method: 'POST',
      data: values.list,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveAddSqls(response))
      openNotificationWithIcon('success', '添加成功')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export function deleteSqls(values) {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/sqls/${values.id}`
    return axios({
      method: 'DELETE',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      openNotificationWithIcon('success', '删除成功')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export function updateSqls(values) {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/sqls`
    return axios({
      method: 'PUT',
      data: values.list,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      openNotificationWithIcon('success', '修改成功')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export function execSqls(values) {
  return (dispatch, getState) => {
    dispatch(requestExecSqls())
    let url = `${SANGO2_API_HOST}/sqls/${values.id}/exec`
    return axios({
      method: 'POST',
      data: values.list,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveExecSqls(response))
      alertInfo(response)
      // openNotificationWithIcon('success', '执行成功')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export function mergebeforeSqls(values) {
  return (dispatch, getState) => {
    dispatch(requestBeforeSqls())
    let url = `${SANGO2_API_HOST}/sqls/${values.id}/exec/mergebefore`
    return axios({
      method: 'POST',
      data: values.list,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveBeforeSqls(response))
      alertInfo(response)
      // openNotificationWithIcon('success', '执行成功')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export function exportSqls(values) {
  return (dispatch, getState) => {
    dispatch(requestExportSqls())
    openNotificationWithIcon('success', '正在导出,请稍后')
    let url = `${SANGO2_API_HOST}/sqls/${values.id}/export`
    return axios({
      method: 'POST',
      data: values.list,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveExportSqls(response))
      openNotificationWithIcon('success', '导出成功')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
      } else {
        console.log('Error', error.message)
      }
    })
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_SQLS]: (state, action) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_SQLS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      sqls: action.payload ? action.payload.data.domainObject : []
    })
  },
  [CLEAR_SQLS]: (state) => {
    return ({
      ...state,
      fetching: false,
      sqls: [],
      execSqls: {},
      sqlExport: null,
      error: null
    })
  },
  [REQUEST_ADD_SQLS]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_ADD_SQLS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      sqls: state.sqls.concat(action.payload.data)
    })
  },
  [REQUEST_EXEC_SQLS]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_EXEC_SQLS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      execSqls: action.payload.data.domainObject
    })
  },
  [CLEAR_EXEC_SQLS]: (state) => {
    return ({
      ...state,
      execSqls: {}
    })
  },
  [REQUEST_BEFORE_SQLS]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_BEFORE_SQLS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      newSqls: action.payload.data.domainObject
    })
  },
  [CLEAR_BEFORE_SQLS]: (state) => {
    return ({
      ...state,
      newSqls: {}
    })
  },
  [REQUEST_EXPORT_SQLS]: (state) => {
    return ({
      ...state,
      fetching: false
    })
  },
  [RECEIVE_EXPORT_SQLS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      sqlExport: action.payload.data.downloadLink
    })
  },
  [REQUEST_ERR]: (state, action) => {
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
  sqls: [],
  error: null,
  execSqls: {},
  newSqls: {},
  sqlExport: null
}

  export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
