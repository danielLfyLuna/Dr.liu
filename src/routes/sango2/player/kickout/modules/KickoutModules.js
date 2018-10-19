/* global SANGO2_API_HOST */
import axios from 'axios'
import _ from 'lodash'

import openNotificationWithIcon from '../../../../../components/notification'
import {singOut} from '../../../../../modules/login'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_ONLINE = 'REQUEST_ONLINE'
const RECEIVE_ONLINE = 'RECEIVE_ONLINE'
const REQUEST_KICKOUT = 'REQUEST_KICKOUT'

const KEEPING_KICKOUT = 'KEEPING_KICKOUT'

// ------------------------------------
// Actions
// ------------------------------------

function requestOnLine () {
  return {
    type: REQUEST_ONLINE
  }
}
function receiveOnLine (data) {
  return {
    type: RECEIVE_ONLINE,
    list: data
  }
}
function requestKickout () {
  return {
    type: REQUEST_KICKOUT
  }
}
function keepKickout(data) {
  return {
    type: KEEPING_KICKOUT,
    payload: data
  }
}

function onLineSearchActionCreator(value = {}) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', value)
    dispatch(requestOnLine())
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/servers/${value.products[1]}/players/online?nickname=${value.nickname}`
    axios({
      method: 'get',
      url: url,
      headers: {
        'productId': value.products[0],
        'serverId': value.products[1],
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      console.log(data.data.domainObject.length)
      if (data.data.domainObject.length <= 0) {
        openNotificationWithIcon('info', '未找到该用户', '', 3)
      }
      dispatch(receiveOnLine(data.data.domainObject))
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('error', '登录过期', error.response.data.message, 3)
          dispatch(singOut())
        }
        if (error.response.data.error) {
          openNotificationWithIcon('error', error.response.data.status, error.response.data.message, 10)
        }
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function kickoutActionCreator(products, playerId, recordData) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', products, playerId, recordData)
    dispatch(requestKickout())
    let url = `${SANGO2_API_HOST}/products/${products[0]}/servers/${products[1]}/players/${playerId}/kickout`
    axios({
      method: 'put',
      url: url,
      headers: {
        'productId': products[0],
        'serverId': products[1],
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      if (data.data.msg === '该用户不在线！') {
        openNotificationWithIcon('error', '操作失败', data.data.msg, 5)
        let arrData = [...recordData]
        let ind = _.findIndex(arrData, { 'playerId': playerId })
        arrData.splice(ind, 1)
        dispatch(receiveOnLine(arrData))
      } else {
        openNotificationWithIcon('info', '操作成功', `玩家ID：${JSON.parse(data.data.msg).playerId} 的用户已强制下线！`, 5)
        let arrData = [...recordData]
        let ind = _.findIndex(arrData, { 'playerId': JSON.parse(data.data.msg).playerId })
        arrData.splice(ind, 1)
        dispatch(receiveOnLine(arrData))
      }
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('error', '登录过期', error.response.data.message, 3)
          dispatch(singOut())
        }
        if (error.response.data.error) {
          openNotificationWithIcon('error', error.response.data.status, error.response.data.message, 10)
        }
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  onLineSearchActionCreator,
  kickoutActionCreator,
  receiveOnLine,
  keepKickout
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_ONLINE]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_ONLINE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: [...action.list]
    })
  },
  [REQUEST_KICKOUT]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [KEEPING_KICKOUT]: (state, action) => {
    // console.log(action.payload)
    return ({
      ...state,
      keeping: Object.assign({}, action.payload)
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  list: [],
  keeping: {}
}
export default function mailsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
