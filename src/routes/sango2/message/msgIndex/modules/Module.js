import apiHost from '../../../../../axios/apiHost'
import openNotificationWithIcon from '../../../../../components/notification'
import { singOut } from '../../../../../modules/login'

import _ from 'lodash'


// ------------------------------------
// Constants
// ------------------------------------
const MESSAGE_REQUEST = 'MESSAGE_REQUEST'
const MESSAGE_RECEIVE = 'MESSAGE_RECEIVE'
const MESSAGE_CLEAR = 'MESSAGE_CLEAR'

const SINGLEMSG_RECEIVE = 'SINGLEMSG_RECEIVE'
const SINGLEMSG_CLEAR = 'SINGLEMSG_CLEAR'

const MSG_TEMP_RECEIVE = 'MSG_TEMP_RECEIVE'

const MESSAGE_SEND_REQUEST = 'MESSAGE_SEND_REQUEST'
const MESSAGE_SEND_RECEIVE = 'MESSAGE_SEND_RECEIVE'

const MESSAGE_REQUEST_ERR = 'MESSAGE_REQUEST_ERR'
// ------------------------------------
// Actions
// ------------------------------------

function requestMessage() {
  return {
    type: MESSAGE_REQUEST
  }
}

function receiveMessage(data) {
  return {
    type: MESSAGE_RECEIVE,
    payload: data
  }
}

function clearMessage() {
  return {
    type: MESSAGE_CLEAR
  }
}

function requestErr(data) {
  return {
    type: MESSAGE_REQUEST_ERR,
    payload: data
  }
}

function fetchMessage(value = {}) {
  return (dispatch, getState) => {
    dispatch(requestMessage())
    let url = '/short-message/messages'
    let config = _.assign(
      {
        params: value
      },
      {headers:
        {
          'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
        }
      }
    )
    apiHost
      .get(url, config)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveMessage(result))
        }

        if (code === 1) {
          dispatch(singOut())
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(requestErr(error.response.data))
          // 请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.header)
        } else {
          // 一些错误是在设置请求的时候触发
          console.log('Error', error.message)
        }
        console.log(error)
      })
  }
}

function receiveTemp(data) {
  return {
    type: MSG_TEMP_RECEIVE,
    payload: data
  }
}

function fetchTemp(value = {}) {
  return (dispatch, getState) => {
    let url = '/short-message/templates'
    let config = {
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }
    apiHost
      .get(url, config)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveTemp(result))
        }

        if (code === 1) {
          dispatch(singOut())
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(requestErr(error.response.data))
          // 请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.header)
        } else {
          // 一些错误是在设置请求的时候触发
          console.log('Error', error.message)
        }
        console.log(error)
      })
  }
}

function requestSend() {
  return {
    type: MESSAGE_SEND_REQUEST
  }
}

function receiveSend(data) {
  return {
    type: MESSAGE_SEND_RECEIVE,
    payload: data
  }
}

function sendMessage(value = {}) {
  return (dispatch, getState) => {
    if (getState().message.fetching) {
      return
    }
    dispatch(requestSend())
    let url = `/short-message/goup/${value.groupId}/send`
    let config = {
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }
    apiHost
      .post(url, {}, config)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveSend(result))
          openNotificationWithIcon('success', '发送成功！')
        }

        if (code === 1) {
          dispatch(singOut())
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(requestErr(error.response.data))
          // 请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.header)
        } else {
          // 一些错误是在设置请求的时候触发
          console.log('Error', error.message)
        }
        console.log(error)
      })
  }
}

function receiveSingle(data) {
  return {
    type: SINGLEMSG_RECEIVE,
    payload: data
  }
}

function clearSingle() {
  return {
    type: SINGLEMSG_CLEAR
  }
}

function singleMsg(value = {}) {
  return (dispatch, getState) => {
    let url = `/short-message/goup/${value.groupId}`
    let config = {
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }
    apiHost
      .get(url, config)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveSingle(result))
        }

        if (code === 1) {
          dispatch(singOut())
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(requestErr(error.response.data))
          // 请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.header)
        } else {
          // 一些错误是在设置请求的时候触发
          console.log('Error', error.message)
        }
        console.log(error)
      })
  }
}

export {
  fetchMessage,
  clearMessage,
  fetchTemp,
  sendMessage,
  singleMsg,
  clearSingle
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MESSAGE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [MESSAGE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload ? action.payload.data.messages : []
    })
  },
  [MESSAGE_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: null,
      templates: [],
      list: [],
      send: []
    })
  },
  [MSG_TEMP_RECEIVE]: (state, action) => {
    return ({
      ...state,
      templates: action.payload ? action.payload.data.templates : []
    })
  },
  [MESSAGE_SEND_REQUEST]: (state, action) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [MESSAGE_SEND_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      send: action.payload ? action.payload.data.messages : []
    })
  },
  [SINGLEMSG_RECEIVE]: (state, action) => {
    return ({
      ...state,
      single: action.payload ? action.payload.data.messages : []
    })
  },
  [SINGLEMSG_CLEAR]: (state, action) => {
    return ({
      ...state,
      single: [],
      err: null
    })
  },
  [MESSAGE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: action.payload.response.data.tips
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  err: null,
  list: [],
  templates: [],
  send: [],
  single: []
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
