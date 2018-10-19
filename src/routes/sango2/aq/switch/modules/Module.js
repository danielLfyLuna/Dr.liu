import sango2 from '../../../../../axios/sango2'
import openNotificationWithIcon from '../../../../../components/notification'

import { singOut } from '../../../../../modules/login'


// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_AQ_SWITCH = 'RECEIVE_AQ_SWITCH'
const REQUEST_AQ_SWITCH = 'REQUEST_AQ_SWITCH'

const AQ_SWITCH_ERR = 'AQ_SWITCH_ERR'

// ------------------------------------
// Actions
// ------------------------------------

function requestAQ() {
  return {
    type: REQUEST_AQ_SWITCH
  }
}

function receiveAQ(data) {
  return {
    type: RECEIVE_AQ_SWITCH,
    payload: data
  }
}


function requestErr(data) {
  return {
    type: AQ_SWITCH_ERR,
    payload: data
  }
}

function switchAQ(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().aq.fetching) {
      return
    }

    dispatch(requestAQ())
    let url = '/answer/switch'
    let dataes = value
    sango2
      .put(url, dataes)
      .then(result => {
        const { status, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveAQ(result))
          if (result.data.msg === '') {
            if (value.open === 1) {
              openNotificationWithIcon('success', '开启成功')
            }
            if (value.open === 0) {
              openNotificationWithIcon('success', '关闭成功')
            }
          }
          else {
            openNotificationWithIcon('error', '操作失败', result.data.msg)
          }
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
  switchAQ
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_AQ_SWITCH]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_AQ_SWITCH]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload ? action.payload.data : []
    })
  },
  [AQ_SWITCH_ERR]: (state, action) => {
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
  list: [],
  error: null
}

  export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
