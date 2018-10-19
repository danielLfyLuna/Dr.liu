/* global SANGO2_API_HOST */
import axios from 'axios'
import _ from 'lodash'
import openNotificationWithIcon from '../../../../../components/notification'

import {singOut} from '../../../../../modules/login'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_INFOS = 'REQUEST_INFOS'
const RECEIVE_INFOS = 'RECEIVE_INFOS'

const REQUEST_CLEAR_HEAD = 'REQUEST_CLEAR_HEAD'

const REQUEST_SKIPNOVICE = 'REQUEST_SKIPNOVICE'
const RECEIVE_SKIPNOVICE = 'RECEIVE_SKIPNOVICE'

const REQUEST_NOVICES = 'REQUEST_NOVICES'
const RECEIVE_NOVICES = 'RECEIVE_NOVICES'

const REQUEST_RENAME = 'REQUEST_RENAME'

const REQUEST_KICKOUT = 'REQUEST_KICKOUT'

const RECEIVE_PASSWORDRESET = 'RECEIVE_PASSWORDRESET'

const KEEPING_INFOS = 'KEEPING_INFOS'
// ------------------------------------
// Actions
// ------------------------------------

function requestInfos () {
  return {
    type: REQUEST_INFOS
  }
}
function receiveInfos (data) {
  return {
    type: RECEIVE_INFOS,
    list: data
  }
}

function requestClearHead () {
  return {
    type: REQUEST_CLEAR_HEAD
  }
}

function requestSkipnovice () {
  return {
    type: REQUEST_SKIPNOVICE
  }
}
function receiveSkipnovice () {
  return {
    type: RECEIVE_SKIPNOVICE
  }
}

function requestNovices () {
  return {
    type: REQUEST_NOVICES
  }
}
function receiveNovices () {
  return {
    type: RECEIVE_NOVICES
  }
}

function requestRename () {
  return {
    type: REQUEST_RENAME
  }
}

function requestKickout () {
  return {
    type: REQUEST_KICKOUT
  }
}

function receivePassword () {
  return {
    type: RECEIVE_PASSWORDRESET
  }
}

function infosSearchActionCreator(value = {}) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', value)
    dispatch(requestInfos())
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/servers/${value.products[1]}/players`
    axios({
      method: 'get',
      url: url,
      params: {
        nickname: value.nickname,
        playerId: value.playerId,
        platformId: value.platformId
      },
      headers: {
        'productId': value.products[0],
        'serverId': value.products[1],
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      dispatch(receiveInfos(data.data.domainObject))
      if (data.data.domainObject.length <= 0) {
        openNotificationWithIcon('info', 'user not found', '', 3)
      }
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('error', 'Token failure', error.response.data.message, 3)
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

function clearHeadActionCreator(products, playerId, recordData) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', products, playerId, recordData)
    dispatch(requestClearHead())
    let url = `${SANGO2_API_HOST}/products/${products[0]}/servers/${products[1]}/players/${playerId}/clear/headimg`
    axios({
      method: 'PUT',
      url: url,
      headers: {
        'productId': products[0],
        'serverId': products[1],
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      openNotificationWithIcon('info', 'success！', data.data.msg, 3)
      dispatch(receiveInfos(recordData))
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('error', 'Token failure', error.response.data.message, 3)
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

function updateSkipnovice(products, nickname) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', products, nickname)
    dispatch(requestSkipnovice())
    let url = `${SANGO2_API_HOST}/products/${products[0]}/servers/${products[1]}/players/skipnovice?nickname=${nickname}`
    axios({
      method: 'get',
      url: url,
      headers: {
        'productId': products[0],
        'serverId': products[1],
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      openNotificationWithIcon('info', 'success！', data.data.msg, 3)
      dispatch(receiveSkipnovice())
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('error', 'Token failure', error.response.data.message, 3)
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

function updateNovices(values) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', values)
    dispatch(requestNovices())
    let url = `${SANGO2_API_HOST}/products/${values.products[0]}/servers/${values.products[1]}/players/skipnovicebatch`
    axios({
      method: 'POST',
      url: url,
      data: values.list,
      headers: {
        'productId': values.products[0],
        'serverId': values.products[1],
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      openNotificationWithIcon('info', 'success！', data.data.msg, 3)
      dispatch(receiveNovices())
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('error', 'Token failure', error.response.data.message, 3)
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

function updateNickName(values, record, list) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', values)
    console.log('Records: ', record)
    console.log('lists: ', list)
    let products = values.products.split('/')
    console.log(products)
    dispatch(requestRename())
    let url = `${SANGO2_API_HOST}/products/${products[0]}/servers/${products[1]}/players/rename`
    axios({
      method: 'PUT',
      url: url,
      data: {
        newname: values.nickname,
        playerId: record.playerId
      },
      headers: {
        'productId': products[0],
        'serverId': products[1],
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      let recordData = _.map(list, (value, index, collection) => {
        if (value.playerId === record.playerId) {
          value.nickname = values.nickname
          return value
        } else {
          return value
        }
      })
      openNotificationWithIcon('info', data.data.msg, '', 3)
      dispatch(receiveInfos(recordData))
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('error', 'Token failure', error.response.data.message, 3)
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
        openNotificationWithIcon('error', 'fail！', data.data.msg, 5)
        // let arrData = [...recordData]
        // let ind = _.findIndex(arrData, { 'playerId': playerId })
        // arrData.splice(ind, 1)
        dispatch(receiveInfos(recordData))
      } else {
        openNotificationWithIcon('info', 'success！', `玩家ID：${JSON.parse(data.data.msg).playerId} 的用户已强制下线！`, 5)
        // let arrData = [...recordData]
        // let ind = _.findIndex(arrData, { 'playerId': JSON.parse(data.data.msg).playerId })
        // arrData.splice(ind, 1)
        dispatch(receiveInfos(recordData))
      }
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('error', 'Token failure', error.response.data.message, 3)
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

function resetPassword(value) {
  return (dispatch) => {
    dispatch(requestKickout())
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/servers/${value.products[1]}/players/${value.playerId}/resetpass/${value.type}`
    axios({
      method: 'put',
      url: url,
      headers: {
        'productId': value.products[0],
        'serverId': value.products[1],
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receivePassword())
      openNotificationWithIcon('success', value.type === 1 ? '解锁成功' : '重置成功', response.data.msg)
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('error', 'Token failure', error.response.data.message, 3)
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

function keepInfos(data) {
  return {
    type: KEEPING_INFOS,
    payload: data
  }
}

export {
  infosSearchActionCreator,
  clearHeadActionCreator,
  kickoutActionCreator,
  receiveInfos,
  updateSkipnovice,
  updateNovices,
  updateNickName,
  resetPassword,
  keepInfos
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_INFOS]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_INFOS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: [...action.list]
    })
  },
  [REQUEST_CLEAR_HEAD]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [REQUEST_SKIPNOVICE]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_SKIPNOVICE]: (state) => {
    return ({
      ...state,
      fetching: false
    })
  },
  [REQUEST_NOVICES]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_NOVICES]: (state) => {
    return ({
      ...state,
      fetching: false
    })
  },
  [REQUEST_RENAME]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [REQUEST_KICKOUT]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_PASSWORDRESET]: (state) => {
    return ({
      ...state
    })
  },
  [KEEPING_INFOS]: (state, action) => {
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
