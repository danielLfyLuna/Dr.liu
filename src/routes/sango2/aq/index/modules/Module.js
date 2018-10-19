import sango2 from '../../../../../axios/sango2'
import openNotificationWithIcon from '../../../../../components/notification'

import { singOut } from '../../../../../modules/login'
import _ from 'lodash'


// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_AQ = 'RECEIVE_AQ'
const REQUEST_AQ = 'REQUEST_AQ'
const CLEAR_AQ = 'CLEAR_AQ'

const RECEIVE_AQ_ADD = 'RECEIVE_AQ_ADD'
const REQUEST_AQ_ADD = 'REQUEST_AQ_ADD'

const RECEIVE_AQ_DEL = 'RECEIVE_AQ_DEL'
const REQUEST_AQ_DEL = 'REQUEST_AQ_DEL'

const RECEIVE_AQ_UP = 'RECEIVE_AQ_UP'
const REQUEST_AQ_UP = 'REQUEST_AQ_UP'

const AQ_ERR = 'AQ_ERR'

// ------------------------------------
// Actions
// ------------------------------------

function requestAQ() {
  return {
    type: REQUEST_AQ
  }
}

function receiveAQ(data) {
  return {
    type: RECEIVE_AQ,
    payload: data
  }
}

function clearAQ() {
  return {
    type: CLEAR_AQ
  }
}

function requestErr(data) {
  return {
    type: AQ_ERR,
    payload: data
  }
}

function fetchAQ(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().aq.fetching) {
      return
    }

    dispatch(requestAQ())
    let url = '/answer'
    let config = {
      params: value
    }
    sango2
      .get(url, config)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveAQ(result))
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

function requestADD() {
  return {
    type: REQUEST_AQ_ADD
  }
}

function receiveADD(data) {
  return {
    type: RECEIVE_AQ_ADD,
    payload: data
  }
}

function addAQ(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().aq.adding) {
      return
    }

    dispatch(requestADD())
    let url = '/answer'
    let data = value
    sango2
      .post(url, data)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveADD(result))
          openNotificationWithIcon('success', '添加成功！')
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

function requestDEL() {
  return {
    type: REQUEST_AQ_DEL
  }
}

function receiveDEL(data) {
  return {
    type: RECEIVE_AQ_DEL,
    payload: data
  }
}

function deleteAQ(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().aq.removing) {
      return
    }

    dispatch(requestDEL())
    let url = `/answer/${value.id}`
    sango2
      .delete(url)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveDEL(result))
          openNotificationWithIcon('success', '删除成功！')
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

function requestUpdate() {
  return {
    type: REQUEST_AQ_UP
  }
}

function receiveUpdate(data) {
  return {
    type: RECEIVE_AQ_UP,
    payload: data
  }
}

function updateAQ(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().aq.updating) {
      return
    }

    dispatch(requestUpdate())
    let url = '/answer'
    let data = value
    sango2
      .put(url, data)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveUpdate(result))
          openNotificationWithIcon('success', '修改成功！')
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
  fetchAQ,
  clearAQ,
  addAQ,
  deleteAQ,
  updateAQ
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_AQ]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_AQ]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload ? action.payload.data.domainObject : []
    })
  },
  [CLEAR_AQ]: (state) => {
    return ({
      ...state,
      fetching: false,
      adding: false,
      removing: false,
      updating: false,
      list: [],
      add: {},
      remove: {},
      update: {},
      error: null
    })
  },
  [REQUEST_AQ_ADD]: (state) => {
    return ({
      ...state,
      adding: true
    })
  },
  [RECEIVE_AQ_ADD]: (state, action) => {
    state.list.unshift(action.payload.data)
    return ({
      ...state,
      adding: false,
      add: action.payload ? action.payload.data : {}
    })
  },
  [REQUEST_AQ_DEL]: (state) => {
    return ({
      ...state,
      removing: true
    })
  },
  [RECEIVE_AQ_DEL]: (state, action) => {
    let value = []
    _.map(state.list, (v, i) => {
      if (v.id === action.payload.data.id) {
        return
      }
      value.push(v)
    })
    state.list = value
    return ({
      ...state,
      removing: false,
      remove: action.payload ? action.payload.data : {}
    })
  },
  [REQUEST_AQ_UP]: (state) => {
    return ({
      ...state,
      updating: true
    })
  },
  [RECEIVE_AQ_UP]: (state, action) => {
    _.forEach(state.list, (v, i) => {
      if (v.id === action.payload.data.id) {
        state.list[i] = action.payload.data
      }
    })
    return ({
      ...state,
      updating: false,
      update: action.payload ? action.payload.data : {}
    })
  },

  [AQ_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      adding: false,
      removing: false,
      updating: false,
      error: action.payload.response.data.tips
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  adding: false,
  removing: false,
  updating: false,
  list: [],
  add: {},
  remove: {},
  update: {},
  error: null
}

  export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
