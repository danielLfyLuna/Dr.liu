/* global SANGO2_API_HOST */
import axios from 'axios'
// import _ from 'lodash'

import openNotificationWithIcon from '../../../../../components/notification'


// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_TIPS_MAINTENANCE = 'REQUEST_TIPS_MAINTENANCE'
const RECEIVE_TIPS_MAINTENANCE = 'RECEIVE_TIPS_MAINTENANCE'
const CLEAR_MAINTENANCE = 'CLEAR_MAINTENANCE'

const REQUEST_UPDATE_MAIN = 'REQUEST_UPDATE_MAIN'
const RECEIVE_UPDATE_MAIN = 'RECEIVE_UPDATE_MAIN'
const CLEAR_UPDATE_MAIN = 'CLEAR_UPDATE_MAIN'

const MAINTENANCE_TIP_ERR = 'MAINTENANCE_TIP_ERR'

// ------------------------------------
// Actions
// ------------------------------------


function requestMaintenanceTip() {
  return {
    type: REQUEST_TIPS_MAINTENANCE
  }
}

function receiveMaintenanceTip(data) {
  return {
    type: RECEIVE_TIPS_MAINTENANCE,
    payload: data
  }
}

function clearMaintenanceTip() {
  return {
    type: CLEAR_MAINTENANCE
  }
}

function requestErr(data) {
  return {
    type: MAINTENANCE_TIP_ERR,
    payload: data
  }
}

function fetchMaintenanceTip(value) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().maintenanceTip.fetching) {
      return
    }
    dispatch(requestMaintenanceTip())
    let url = `${SANGO2_API_HOST}/products/${value}/maintenance-notices`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveMaintenanceTip(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function requestUpdate() {
  return {
    type: REQUEST_UPDATE_MAIN
  }
}

function receiveUpdate(data) {
  return {
    type: RECEIVE_UPDATE_MAIN,
    payload: data
  }
}

function clearUpdate() {
  return {
    type: CLEAR_UPDATE_MAIN
  }
}

function updateMaintenanceTip(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().maintenanceTip.sending) {
      return
    }
    dispatch(requestUpdate())
    openNotificationWithIcon('info', '正在提交请勿重复点击提交')
    let url = `${SANGO2_API_HOST}/products/${value.productId}/maintenance-notices`
    return axios({
      method: 'PUT',
      url: url,
      data: value,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveUpdate(response))
      openNotificationWithIcon('success', '修改成功！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}


export {
  fetchMaintenanceTip,
  updateMaintenanceTip,
  clearMaintenanceTip,
  clearUpdate
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_TIPS_MAINTENANCE]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },

  [RECEIVE_TIPS_MAINTENANCE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload ? action.payload.data.domainObject : []
    })
  },

  [CLEAR_MAINTENANCE]: (state) => {
    return ({
      ...state,
      fetching: false,
      list: [],
      error: null
    })
  },

  [REQUEST_UPDATE_MAIN]: (state) => {
    return ({
      ...state,
      sending: true
    })
  },

  [RECEIVE_UPDATE_MAIN]: (state, action) => {
    return ({
      ...state,
      sending: false,
      update: action.payload ? action.payload.data.domainObject : {}
    })
  },

  [CLEAR_UPDATE_MAIN]: (state) => {
    return ({
      ...state,
      sending: false,
      update: {},
      error: null
    })
  },

  [MAINTENANCE_TIP_ERR]: (state, action) => {
    console.log(action.payload)
    return ({
      ...state,
      fetching: false,
      sending: false,
      error: action.payload.tips
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  list: [],
  update: {},
  fetching: false,
  sending: false,
  error: null
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
