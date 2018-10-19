import sango2 from '../../../../../axios/sango2'
import openNotificationWithIcon from '../../../../../components/notification'

import {singOut} from '../../../../../modules/login'

// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_EDITOR = 'RECEIVE_EDITOR'
const REQUEST_EDITOR = 'REQUEST_EDITOR'

const RECEIVE_DEFAULT = 'RECEIVE_DEFAULT'
const REQUEST_DEFAULT = 'REQUEST_DEFAULT'

// ------------------------------------
// Actions
// ------------------------------------

function requestEDITOR() {
  return {
    type: REQUEST_EDITOR
  }
}

function receiveEDITOR(data) {
  return {
    type: RECEIVE_EDITOR,
    payload: data
  }
}

function requestDefault() {
  return {
    type: REQUEST_DEFAULT
  }
}

function receiveDefault(data) {
  return {
    type: RECEIVE_DEFAULT,
    payload: data
  }
}

function fetchEDITOR(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().editor.fetching) {
      return
    }

    dispatch(requestEDITOR())
    let url = '/answer/test'
    let dataes = value
    sango2
      .post(url, dataes)
      .then(result => {
        const {status, code} = result
        if (status >= 200 && status < 300) {
          dispatch(receiveEDITOR(result))
          openNotificationWithIcon('success', '发布成功')
        }

        if (code === 1) {
          dispatch(singOut())
        }
      })
      .catch(function(error) {
        if (error.response) {
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

function fetchDefault(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().editor.fetching) {
      return
    }

    dispatch(requestDefault())
    let url = '/answer/test2'
    sango2
      .get(url)
      .then(result => {
        dispatch(receiveDefault(result))
      })
      .catch(function(error) {
        if (error.response) {
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
export {fetchEDITOR, fetchDefault}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_EDITOR]: state => {
    return {
      ...state,
      fetching: true
    }
  },
  [RECEIVE_EDITOR]: (state, action) => {
    return {
      ...state,
      fetching: false,
      data: Object.assign({}, action.payload)
    }
  },
  [REQUEST_DEFAULT]: state => {
    return {
      ...state,
      fetching: true
    }
  },
  [RECEIVE_DEFAULT]: (state, action) => {
    return {
      ...state,
      fetching: false,
      default: Object.assign({}, action.payload.data)
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  // 数据结构
  fetching: false,
  default: {},
  data: {}
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
