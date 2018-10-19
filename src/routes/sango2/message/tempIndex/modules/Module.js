import apiHost from '../../../../../axios/apiHost'
// import openNotificationWithIcon from '../../../../../components/notification'
import { singOut } from '../../../../../modules/login'


// ------------------------------------
// Constants
// ------------------------------------
const TEMPLATE_REQUEST = 'TEMPLATE_REQUEST'
const TEMPLATE_RECEIVE = 'TEMPLATE_RECEIVE'
const TEMPLATE_CLEAR = 'TEMPLATE_CLEAR'

const TEMPLATE_REQUEST_ERR = 'MESSAGE_REQUEST_ERR'
// ------------------------------------
// Actions
// ------------------------------------

function requestTemplate() {
  return {
    type: TEMPLATE_REQUEST
  }
}

function receiveTemplate(data) {
  return {
    type: TEMPLATE_RECEIVE,
    payload: data
  }
}

function clearTemplate() {
  return {
    type: TEMPLATE_CLEAR
  }
}

function requestErr(data) {
  return {
    type: TEMPLATE_REQUEST_ERR,
    payload: data
  }
}

function fetchTemplate(value = {}) {
  return (dispatch, getState) => {
    dispatch(requestTemplate())
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
          dispatch(receiveTemplate(result))
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
  fetchTemplate,
  clearTemplate
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TEMPLATE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [TEMPLATE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload ? action.payload.data.templates : []
    })
  },
  [TEMPLATE_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: null,
      list: []
    })
  },
  [TEMPLATE_REQUEST_ERR]: (state, action) => {
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
  list: []
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
