import sango2 from '../../../../../../axios/sango2'
import openNotificationWithIcon from '../../../../../../components/notification'

import { singOut } from '../../../../../../modules/login'


// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_CD = 'RECEIVE_CD'
const REQUEST_CD = 'REQUEST_CD'

const RECEIVE_CD_SET = 'RECEIVE_CD_SET'
const REQUEST_CD_SET = 'REQUEST_CD_SET'

const CD_ERR = 'CD_ERR'

// ------------------------------------
// Actions
// ------------------------------------

function requestCD() {
  return {
    type: REQUEST_CD
  }
}

function receiveCD(data) {
  return {
    type: RECEIVE_CD,
    payload: data
  }
}


function requestErr(data) {
  return {
    type: CD_ERR,
    payload: data
  }
}

function fetchCD(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().setCDKey.fetching) {
      return
    }

    dispatch(requestCD())
    let url = `/products/${value.productId}/activitys/types/7/${value.id}`
    // let url = '/products/1/activitys/types/7/1'
    sango2
      .get(url)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveCD(result))
          }
          else {
            openNotificationWithIcon('error', '操作失败', result.data.msg)
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

function requestSet() {
  return {
    type: REQUEST_CD_SET
  }
}

function receiveSet(data) {
  return {
    type: RECEIVE_CD_SET,
    payload: data
  }
}

function setCD(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().setCDKey.putting) {
      return
    }

    dispatch(requestSet())
    let url = `/products/${value.productId}/activitys/types/7/${value.id}`
    // let url = '/products/1/activitys/types/7/1'
    let dataes = value.list
    sango2
      .put(url, dataes)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveSet(result))
          openNotificationWithIcon('success', '设置成功')
          dispatch(fetchCD(value))
          }
          else {
            openNotificationWithIcon('error', '操作失败', result.data.msg)
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
  fetchCD,
  setCD
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_CD]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_CD]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload ? action.payload.data.resource : []
    })
  },
  [REQUEST_CD_SET]: (state) => {
    return ({
      ...state,
      putting: true
    })
  },
  [RECEIVE_CD_SET]: (state, action) => {
    return ({
      ...state,
      putting: false,
      put: action.payload ? action.payload.data : {}
    })
  },
  [CD_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      putting: false,
      error: action.payload.response.data.tips
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  putting: false,
  list: [],
  put: {},
  error: null
}

  export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
