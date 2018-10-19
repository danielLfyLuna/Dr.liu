/* global SANGO2_API_HOST */
import axios from 'axios'
import { singOut } from '../../../modules/login'
import openNotificationWithIcon from '../../../components/notification'
// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_SERVERPARAMS = 'RECEIVE_SERVERPARAMS'
const REQUEST_SERVERPARAMS = 'REQUEST_SERVERPARAMS'

const RELOAD_SERVERPARAMS = 'RELOAD_SERVERPARAMS'

const SERVERPARAMS_ERR = 'SERVERPARAMS_ERR'

// ------------------------------------
// Actions
// ------------------------------------

function requestSP() {
  return {
    type: REQUEST_SERVERPARAMS
  }
}

function receiveSP(data) {
  return {
    type: RECEIVE_SERVERPARAMS,
    payload: data
  }
}

function requestErr(data) {
  return {
    type: SERVERPARAMS_ERR,
    payload: data
  }
}

function fetchSP(value) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().homes.fetching) {
      return
    }

    dispatch(requestSP())
    let url = `${SANGO2_API_HOST}/global/serverparams`

    return axios({
      method: 'GET',
      url: url,
      headers: {
        adminUserId: value.userId,
        Authorization: `bearer ${value.token}`
      }
    }).then(response => {
      dispatch(receiveSP(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
      } else {
        console.log('Error', error.message)
      }
    })
    // sango2
    //   .get(url)
    //   .then(result => {
    //     const { status } = result
    //     if (status >= 200 && status < 300) {
    //       dispatch(receiveSP(result))
    //     }
    //   })
    //   .catch(function(error) {
    //     if (error.response) {
    //       dispatch(requestErr(error.response.data))
    //       // 请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
    //       console.log(error.response.data)
    //       console.log(error.response.status)
    //       console.log(error.response.header)
    //     } else {
    //       // 一些错误是在设置请求的时候触发
    //       console.log('Error', error.message)
    //     }
    //     console.log(error)
    //   })
  }
}

function receiveReload(data) {
  return {
    type: RELOAD_SERVERPARAMS,
    payload: data
  }
}

function reloadSP() {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/global/serverparams/reload`

    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveReload(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        if (
          error.response.data.tips.includes('token失效') ||
          error.response.data.tips.includes('请重新登录')
        ) {
          openNotificationWithIcon('error', error.response.status, error.response.data.tips, 3)
          dispatch(singOut())
        }
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchSP,
  reloadSP
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_SERVERPARAMS]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_SERVERPARAMS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload ? action.payload.data.domainObject : {}
    })
  },
  [RELOAD_SERVERPARAMS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload ? action.payload.data.domainObject : state.list
    })
  },
  [SERVERPARAMS_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      error: action.payload.tips
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
