/* global SANGO2_API_HOST */
import axios from 'axios'

import openNotificationWithIcon from '../../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_NOTICES_TIMING = 'RECEIVE_NOTICES_TIMING'
const REQUEST_NOTICES_TIMING = 'REQUEST_NOTICES_TIMING'
const CLEAR_NOTICES_TIMING = 'CLEAR_NOTICES_TIMING'

const REQUEST_ERR = 'REQUEST_ERR'

const KEEPING_NOTICES_TIMING = 'KEEPING_NOTICES_TIMING'

// ------------------------------------
// Actions
// ------------------------------------

function requestNoticesTiming() {
  return {
    type: REQUEST_NOTICES_TIMING
  }
}

function receiveNoticesTiming(data) {
  return {
    type: RECEIVE_NOTICES_TIMING,
    payload: data
  }
}

function clearNoticesTiming() {
  return {
    type: CLEAR_NOTICES_TIMING
  }
}

function requestErr(data) {
  return {
    type: REQUEST_ERR,
    data: data
  }
}

function keepNoticesTiming(data) {
  return {
    type: KEEPING_NOTICES_TIMING,
    payload: data
  }
}

function fetchNoticesTiming(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().timingNotice.fetching) {
      return
    }
    dispatch(requestNoticesTiming())
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/timingnotices?type=${value.noticeType}&pageNum=1&pageSize=25&startTime=${value['range-time-picker'][0].format('YYYY-MM-DD HH:mm:ss')}&endTime=${value['range-time-picker'][1].format('YYYY-MM-DD HH:mm:ss')}`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveNoticesTiming(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function addTimingNotice(notice) {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/products/${notice.productId}/timingnotices`
    return axios({
      method: 'POST',
      data: {
        title: notice.title,
        type: notice.type,
        circleType: notice.circleType,
        count: notice.count,
        maxCount: notice.maxCount,
        state: notice.state,
        interval: notice.interval,
        intervalUnit: notice.intervalUnit,
        beginTime: notice['range-time-picker'][0].format('YYYY-MM-DD HH:mm:ss'),
        endTime: notice['range-time-picker'][1].format('YYYY-MM-DD HH:mm:ss'),
        content: notice.content,
        productId: notice.productId,
        serverIdList: notice.serverIdList
      },
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      openNotificationWithIcon('success', 'Add Successful')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function stopTimingNotice(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().timingNotice.fetching) {
      return
    }
    let url = `${SANGO2_API_HOST}/products/${value.productId}/timingnotices/${value.id}/stop`
    return axios({
      method: 'PUT',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      openNotificationWithIcon('success', 'Has Stopped')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function deleteTimingNotice(value = {}) {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/products/${value.productId}/timingnotices/${value.id}`
    return axios({
      method: 'DELETE',
      data: value,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      openNotificationWithIcon('success', 'delete successful')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}


export {
  requestNoticesTiming,
  receiveNoticesTiming,
  clearNoticesTiming,
  fetchNoticesTiming,
  addTimingNotice,
  stopTimingNotice,
  deleteTimingNotice,
  keepNoticesTiming
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_NOTICES_TIMING]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_NOTICES_TIMING]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      notices: action.payload ? action.payload.data.domainObject : []
    })
  },
  [CLEAR_NOTICES_TIMING]: (state) => {
    return ({
      ...state,
      fetching: false,
      notices: [],
      error: null
    })
  },
  [REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      error: { tips: action.payload.response.data.tips }
    })
  },
  [KEEPING_NOTICES_TIMING]: (state, action) => {
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
const initialState = { // 数据结构
  fetching: false,
  notices: [],
  error: null,
  keeping: {}
}

  export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
