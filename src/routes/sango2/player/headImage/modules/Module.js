/* global SANGO2_API_HOST */
import axios from 'axios'
import _ from 'lodash'

import openNotificationWithIcon from '../../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const HEAD_REQUEST = 'HEAD_REQUEST'
const HEAD_RECEIVE = 'HEAD_RECEIVE'
const HEAD_CLEAR = 'HEAD_CLEAR'

const HEAD_BAN = 'HEAD_BAN'

const HEAD_BAN_BUTTON = 'HEAD_BAN_BUTTON'

const HEAD_PASS_ALL = 'HEAD_PASS_ALL'

const HEAD_REQUEST_ERR = 'HEAD_REQUEST_ERR'

// ------------------------------------
// Actions
// ------------------------------------

function requestHeadImage() {
  return {
    type: HEAD_REQUEST
  }
}

function receiveHeadImage(data) {
  return {
    type: HEAD_RECEIVE,
    payload: data
  }
}

function clearHeadImage() {
  return {
    type: HEAD_CLEAR
  }
}

function requestErr(data) {
  return {
    type: HEAD_REQUEST_ERR,
    payload: data
  }
}

function banHeadImageSuccess() {
  return {
    type: HEAD_BAN
  }
}

function banButtonStatus(data) {
  return {
    type: HEAD_BAN_BUTTON,
    payload: data
  }
}

function passHeadImageSuccess() {
  return {
    type: HEAD_PASS_ALL
  }
}

function fetchHeadImage(value) {
  return (dispatch, getState) => {
    dispatch(requestHeadImage())
    let url = `${SANGO2_API_HOST}/products/${value.productId}/servers/_/players/headimgs`
    return axios({
      method: 'GET',
      url: url,
      params: {
        period: value.period
      },
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveHeadImage(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function banHeadImage(value) {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/servers/${value.products[1]}/players/${value.playerId}/clear/headimg`
    axios({
      method: 'PUT',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(banHeadImageSuccess())
      if (response.data.msg == '重置头像成功') {
        openNotificationWithIcon('success', response.data.msg)
        dispatch(banButtonStatus(value.playerId))
      }
      else {
        openNotificationWithIcon('warning', response.data.msg)
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function passHeadImage(value) {
  return (dispatch, getState) => {

    let url = `${SANGO2_API_HOST}/products/${value.productId}/servers/_/players/headimg/clear`
    axios({
      method: 'delete',
      url: url,
      params: {
        period: value.period
      },
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(passHeadImageSuccess())
      if (response.data.msg == '全部通过头像成功') {
        openNotificationWithIcon('success', response.data.msg)
      }
      else {
        openNotificationWithIcon('warning', response.data.msg)
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  clearHeadImage,
  fetchHeadImage,
  banHeadImage,
  passHeadImage

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HEAD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [HEAD_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload.data.domainObject
    })
  },
  [HEAD_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      list: [],
      ban: ''
    })
  },
  [HEAD_BAN]: (state) => {
    return ({
      ...state
    })
  },
  [HEAD_PASS_ALL]: (state) => {
    return ({
      ...state
    })
  },
  [HEAD_BAN_BUTTON]: (state, action) => {
    _.forEach(state.list, (v, k) => {
      if (v.playerId === action.payload) {
        state.list[k].isBan = true
      }
    })

    return ({
      ...state,
      ban: action.payload
    })
  },
  [HEAD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: action.payload.data.tips
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  err: false,
  list: [],
  ban: ''
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
