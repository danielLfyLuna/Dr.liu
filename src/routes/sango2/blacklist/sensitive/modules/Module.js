import sango2 from '../../../../../axios/sango2'
import openNotificationWithIcon from '../../../../../components/notification'
import { singOut } from '../../../../../modules/login'


// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_SEN = 'RECEIVE_SEN'
const REQUEST_SEN = 'REQUEST_SEN'
const CLEAR_SEN = 'CLEAR_SEN'

const RECEIVE_SEN_ADD = 'RECEIVE_SEN_ADD'
const REQUEST_SEN_ADD = 'REQUEST_SEN_ADD'

const RECEIVE_SEN_SYNC = 'RECEIVE_SEN_SYNC'
const REQUEST_SEN_SYNC = 'REQUEST_SEN_SYNC'

const SEN_ERR = 'SEN_ERR'

// ------------------------------------
// Actions
// ------------------------------------

function requestSEN() {
  return {
    type: REQUEST_SEN
  }
}

function receiveSEN(data) {
  return {
    type: RECEIVE_SEN,
    payload: data
  }
}

function clearSEN() {
  return {
    type: CLEAR_SEN
  }
}

function requestErr(data) {
  return {
    type: SEN_ERR,
    payload: data
  }
}

function fetchSEN(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().sensitive.fetching) {
      return
    }

    dispatch(requestSEN())
    let url = `/products/${value.productId}/sensitivechar/servers/${value.serverId}`
    sango2
      .get(url)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveSEN(result))
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
    type: REQUEST_SEN_ADD
  }
}

function receiveADD(data) {
  return {
    type: RECEIVE_SEN_ADD,
    payload: data
  }
}

function addSEN(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().sensitive.adding) {
      return
    }

    dispatch(requestADD())
    let url = `/products/${value.productId}/sensitivechar/servers/${value.serverId}`
    let data = { param: value.obj }
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

function requestSync() {
  return {
    type: RECEIVE_SEN_SYNC
  }
}

function receiveSync(data) {
  return {
    type: RECEIVE_SEN_SYNC,
    payload: data
  }
}

function syncSEN(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().sensitive.syncing) {
      return
    }

    dispatch(requestSync())
    let url = `/products/${value.productId}/sensitivechar/servers/${value.serverId}/sync`
    let data = value.target
    sango2
      .post(url, data)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveSync(result))
          openNotificationWithIcon('success', '同步成功！')
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
  fetchSEN,
  clearSEN,
  addSEN,
  syncSEN
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_SEN]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_SEN]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload ? action.payload.data.sensitivechar : []
    })
  },
  [CLEAR_SEN]: (state) => {
    return ({
      ...state,
      fetching: false,
      adding: false,
      syncing: false,
      list: [],
      error: null
    })
  },
  [REQUEST_SEN_ADD]: (state) => {
    return ({
      ...state,
      adding: true
    })
  },
  [RECEIVE_SEN_ADD]: (state, action) => {
    return ({
      ...state,
      adding: false,
      add: action.payload ? action.payload.data : {}
    })
  },
  [REQUEST_SEN_SYNC]: (state) => {
    return ({
      ...state,
      syncing: true
    })
  },
  [RECEIVE_SEN_SYNC]: (state, action) => {
    return ({
      ...state,
      syncing: false,
      sync: action.payload ? action.payload.data : {}
    })
  },
  [SEN_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      adding: false,
      syncing: false,
      error: action.payload.tips
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  adding: false,
  syncing: false,
  list: [],
  add: {},
  sync: {},
  error: null
}

  export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
