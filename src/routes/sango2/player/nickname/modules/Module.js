import sango2 from '../../../../../axios/sango2'
import { singOut } from '../../../../../modules/login'
// import _ from 'lodash'


// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_NICK = 'RECEIVE_NICK'
const REQUEST_NICK = 'REQUEST_NICK'
const CLEAR_NICK = 'CLEAR_NICK'

const NICK_ERR = 'NICK_ERR'

// ------------------------------------
// Actions
// ------------------------------------

function requestNICK() {
  return {
    type: REQUEST_NICK
  }
}

function receiveNICK(data) {
  return {
    type: RECEIVE_NICK,
    payload: data
  }
}

function clearNICK() {
  return {
    type: CLEAR_NICK
  }
}

function requestErr(data) {
  return {
    type: NICK_ERR,
    payload: data
  }
}

function fetchNICK(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().nickname.fetching) {
      return
    }

    dispatch(requestNICK())
    let url = `/products/${value.productId}/servers/${value.serverId}/players/oldname`
    let config = {
      params: value.list
    }
    sango2
      .get(url, config)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveNICK(result))
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
  fetchNICK,
  clearNICK
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_NICK]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_NICK]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload ? action.payload.data.domainObject : {}
    })
  },
  [CLEAR_NICK]: (state) => {
    return ({
      ...state,
      fetching: false,
      list: {},
      error: null
    })
  },

  [NICK_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      error: action.payload.response.data.tips
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  list: {},
  error: null
}

  export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
