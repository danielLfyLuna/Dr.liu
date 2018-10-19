/* global SANGO2_API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../../../../../../../components/notification'
// import { notification } from 'antd'

// import zh from '../../../../../../intl/locales/zh-CN.json'
// import vi from '../../../../../../intl/locales/vi-VN.json'
// import en from '../../../../../../intl/locales/en-US.json'
//
// let locale = localStorage.getItem('locale')

// ------------------------------------
// Constants
// ------------------------------------
const ACT_TEMPLATES_REQUEST = 'ACT_TEMPLATES_REQUEST'
const ACT_TEMPLATES_REQUEST_ERR = 'ACT_TEMPLATES_REQUEST_ERR'
const ACT_TEMPLATES_RECEIVE = 'ACT_TEMPLATES_RECEIVE'

const ACT_BATCH_REQUEST = 'ACT_BATCH_REQUEST'
const ACT_BATCH_RECEIVE = 'ACT_BATCH_RECEIVE'


// ------------------------------------
// Actions
// ------------------------------------

function requestTemplates() {
  return {
    type: ACT_TEMPLATES_REQUEST
  }
}

function requestTemplatesErr(data) {
  return {
    type: ACT_TEMPLATES_REQUEST_ERR,
    payload: data
  }
}

function receiveTemplates(data) {
  return {
    type: ACT_TEMPLATES_RECEIVE,
    payload: data
  }
}

function requestBatch() {
  return {
    type: ACT_BATCH_REQUEST
  }
}

function receiveBatch(data) {
  return {
    type: ACT_BATCH_RECEIVE,
    payload: data
  }
}


function fetchTemplates(data) {
  return (dispatch, getState) => {

    dispatch(requestTemplates())
    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/activitys/templates`
    axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveTemplates(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestTemplatesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function sendBatch(data) {
  return (dispatch, getState) => {

    dispatch(requestBatch())
    let url = `${SANGO2_API_HOST}/products/_/servers/_/activitys`
    axios({
      method: 'POST',
      url: url,
      data: data,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveBatch(response))
      if (response.data.msg.indexOf('发送成功') !== -1) {
        openNotificationWithIcon('success', response.data.msg)
      } else {
        openNotificationWithIcon('warning', response.data.msg)
      }  
    }).catch(error => {
      if (error.response) {
        dispatch(requestTemplatesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchTemplates,
  sendBatch
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACT_TEMPLATES_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: null,
      templates: []
    })
  },
  [ACT_TEMPLATES_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: action.payload ? { tips: action.payload.tips } : null
    })
  },
  [ACT_TEMPLATES_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      templates: action.payload.data ? action.payload.data.domainObject : []
    })
  },
  [ACT_BATCH_REQUEST]: (state) => {
    return ({
      ...state,
      loading: true,
      err: null,
      list: []
    })
  },
  [ACT_BATCH_RECEIVE]: (state, action) => {
    return ({
      ...state,
      loading: false,
      list: action.payload.data ? action.payload.data : {}
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  loading: false,
  err: null,
  templates: [],
  list: {}
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
