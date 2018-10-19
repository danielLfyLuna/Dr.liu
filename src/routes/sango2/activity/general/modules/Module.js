/* global SANGO2_API_HOST */
import axios from 'axios'
// import _ from 'lodash'
import openNotificationWithIcon from '../../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const ACT_SOLDIERS_REQUEST = 'ACT_SOLDIERS_REQUEST'
const ACT_SOLDIERS_RECEIVE = 'ACT_SOLDIERS_RECEIVE'

const ACT_SOLDIERS_ADD_RECEIVE = 'ACT_SOLDIERS_ADD_RECEIVE'

const ACT_SOLDIERS_DETAIL_REQUEST = 'ACT_SOLDIERS_DETAIL_REQUEST'
const ACT_SOLDIERS_DETAIL = 'ACT_SOLDIERS_DETAIL'

const ACT_SOLDIERS_SYNC = 'ACT_SOLDIERS_SYNC'

const ACT_SOLDIERS_ERR = 'ACT_SOLDIERS_ERR'
// ------------------------------------
// Actions
// ------------------------------------

function requestSoldiers() {
  return {
    type: ACT_SOLDIERS_REQUEST
  }
}
function receiveSoldiers(data) {
  return {
    type: ACT_SOLDIERS_RECEIVE,
    payload: data
  }
}

function receiveAdd(data) {
  return {
    type: ACT_SOLDIERS_ADD_RECEIVE,
    payload: data
  }
}

function detailRequest() {
  return {
    type: ACT_SOLDIERS_DETAIL_REQUEST
  }
}

function detailSoldiers(data) {
  return {
    type: ACT_SOLDIERS_DETAIL,
    payload: data
  }
}

function syncReceive(data) {
  return {
    type: ACT_SOLDIERS_SYNC,
    payload: data
  }
}

function soldiersErr(data) {
  return {
    type: ACT_SOLDIERS_ERR,
    payload: data
  }
}

function fetchSoldiers(val) {
  return (dispatch, getState) => {
    dispatch(requestSoldiers())
    let url = `${SANGO2_API_HOST}/soldiers`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveSoldiers(response))
    }).catch(error => {
      if (error.response) {
        dispatch(soldiersErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function addSoldiers(data) {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/soldiers/add`
    return axios({
      method: 'POST',
      data: data,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveAdd(response, data))
      openNotificationWithIcon('success', '操作成功')
    }).catch(error => {
      if (error.response) {
        dispatch(soldiersErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function getDetails(data) {
  return (dispatch, getState) => {
    dispatch(detailRequest())
    let url = `${SANGO2_API_HOST}/soldiers/${data}`
    return axios({
      method: 'get',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(detailSoldiers(response, data))
    }).catch(error => {
      if (error.response) {
        dispatch(soldiersErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function syncSoldiers(data) {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/soldiers/sync/${data.templateId}`
    return axios({
      method: 'PUT',
      url: url,
      data: data.data,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(syncReceive(response))
      if (response.data.msg && !response.data.msg.length) {
        openNotificationWithIcon('success', '同步成功')
      } else {
        const msg = response.data.msg.join(',')
        openNotificationWithIcon('success', `失败的服务器有: ${msg}`)
      }
    }).catch(error => {
      if (error.response) {
        dispatch(soldiersErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
fetchSoldiers,
addSoldiers,
getDetails,
syncSoldiers
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACT_SOLDIERS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: null
    })
  },
  [ACT_SOLDIERS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload.data.domainObject
    })
  },
  [ACT_SOLDIERS_ADD_RECEIVE]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: null
    })
  },
  [ACT_SOLDIERS_DETAIL_REQUEST]: (state, action) => {
    return ({
      ...state,
      err: null,
      visible: false
    })
  },
  [ACT_SOLDIERS_DETAIL]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: null,
      visible: true,
      detail: action.payload.data.domainObject
    })
  },
  [ACT_SOLDIERS_SYNC]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: null
    })
  },
  [ACT_SOLDIERS_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      visible: false,
      err: { tips: action.payload.tips }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  err: null,
  visible: false,
  list: [],
  detail: {}
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
