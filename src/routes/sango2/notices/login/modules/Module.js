/* global SANGO2_API_HOST */
import axios from 'axios'
import _ from 'lodash'

import openNotificationWithIcon from '../../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_NOTICES_LOGIN = 'RECEIVE_NOTICES_LOGIN'
const REQUEST_NOTICES_LOGIN = 'REQUEST_NOTICES_LOGIN'
const CLEAR_NOTICES_LOGIN = 'CLEAR_NOTICES_LOGIN'

const UPDATE_NOTICES = 'UPDATE_NOTICES'
const REFRESH_NOTICES_REDUCER = 'REFRESH_NOTICES_REDUCER'

const DELETE_NOTICES_LOGIN = 'DELETE_NOTICES_LOGIN'
const CLEAR_DELETE = 'CLEAR_DELETE'

const OPEN_ING = 'OPEN_ING'
const OPEN_NOTICES_LOGIN = 'OPEN_NOTICES_LOGIN'
const CLEAR_OPEN = 'CLEAR_OPEN'

const REQUEST_ERR = 'REQUEST_ERR'

// ------------------------------------
// Actions
// ------------------------------------

function requestNoticesLogin() {
  return {
    type: RECEIVE_NOTICES_LOGIN
  }
}

function receiveNoticesLogin(data) {
  return {
    type: RECEIVE_NOTICES_LOGIN,
    payload: data
  }
}

function clearNoticesLogin() {
  return {
    type: CLEAR_NOTICES_LOGIN
  }
}

function requestErr(data) {
  return {
    type: REQUEST_ERR,
    data: data
  }
}

function refreshNoticesReducer(data) {
  return {
    type: REFRESH_NOTICES_REDUCER,
    data: data
  }
}

function fetchNoticesLogin(value = {}) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().notice.fetching) {
      return
    }

    dispatch(requestNoticesLogin())
    let url = `${SANGO2_API_HOST}/products/loginnotices`
    return axios({
      method: 'GET',
      url: url,
      params: value,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveNoticesLogin(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', '获取列表失败', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function addLoginNotice(notice) {
  return (dispatch, getState) => {
    openNotificationWithIcon('warning', '正在提交新公告，请勿重复点击发送！')
    let url = `${SANGO2_API_HOST}/products/loginnotices`
    return axios({
      method: 'POST',
      data: notice,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      openNotificationWithIcon('success', '添加成功')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', '添加失败', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function requestUpdate() {
  return {
    type: UPDATE_NOTICES
  }
}

function updateLoginNotice(notice) {
  return (dispatch, getState) => {
    if (getState().notice.updating) {
      return
    }
    dispatch(requestUpdate())
    openNotificationWithIcon('warning', '正在更新，请勿重复点击发送')
    let url = `${SANGO2_API_HOST}/products/loginnotices/${notice.id}`
    return axios({
      method: 'PUT',
      data: notice,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(refreshNoticesReducer(response))
      openNotificationWithIcon('success', '更新成功')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', '更新失败', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function receiveDelete(data) {
  return {
    type: DELETE_NOTICES_LOGIN,
    payload: data
  }
}

function clearDelete() {
  return {
    type: CLEAR_DELETE
  }
}

function deleteLoginNotice(notice) {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/products/loginnotices/${notice.id}`
    return axios({
      method: 'DELETE',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveDelete(response))
      openNotificationWithIcon('success', '删除成功')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', '删除失败', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function requestOpen() {
  return {
    type: OPEN_ING
  }
}

function receiveOpen(data) {
  return {
    type: OPEN_NOTICES_LOGIN,
    payload: data
  }
}

function clearOpen() {
  return {
    type: CLEAR_OPEN
  }
}

function openLoginNotice(notice) {
  return (dispatch, getState) => {
    if (getState().notice.loading) {
      return
    }
    dispatch(requestOpen())
    let url = `${SANGO2_API_HOST}/products/loginnotices/${notice.id}/status/${notice.open}`
    return axios({
      method: 'PUT',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      console.log(response.data)
      dispatch(receiveOpen(response))
      if (response.data.open === 1) {
        openNotificationWithIcon('success', '开启成功', `公告ID:${response.data.id}开启成功`)
      }
      if (response.data.open === 0) {
        openNotificationWithIcon('success', '关闭成功', `公告ID:${response.data.id}关闭成功`)
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', '开关失败', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}


export {
  requestNoticesLogin,
  receiveNoticesLogin,
  clearNoticesLogin,
  fetchNoticesLogin,
  addLoginNotice,
  updateLoginNotice,
  deleteLoginNotice,
  openLoginNotice,
  clearDelete,
  clearOpen
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_NOTICES_LOGIN]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_NOTICES_LOGIN]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      notices: action.payload ? action.payload.data.domainObject : []
    })
  },
  [CLEAR_NOTICES_LOGIN]: (state) => {
    return ({
      ...state,
      fetching: false,
      notices: [],
      error: null
    })
  },

  [DELETE_NOTICES_LOGIN]: (state, action) => {
    _.remove(state.notices, function(n) { return n.id === action.payload.data.msg })

    return ({
      ...state,
      deleting: false,
      delete: action.payload ? action.payload.data : {},
      error: null
    })
  },
  [CLEAR_DELETE]: (state) => {
    return ({
      ...state,
      delete: {},
      error: null
    })
  },

  [OPEN_ING]: (state) => {
    return ({
      ...state,
      loading: true
    })
  },
  [OPEN_NOTICES_LOGIN]: (state, action) => {
    _.map(state.notices, (val, idx) => {
      if (val.id === action.payload.data.id) {
        val.open = action.payload.data.open
      }
    })
    return ({
      ...state,
      loading: false,
      open: action.payload ? action.payload.data : {},
      error: null
    })
  },
  [CLEAR_OPEN]: (state) => {
    return ({
      ...state,
      open: {},
      error: null
    })
  },

  [REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      loading: false,
      updating: false,
      error: { tips: action.payload.response.data.tips }
    })
  },

  [UPDATE_NOTICES]: (state) => {
    return ({
      ...state,
      updating: true
    })
  },
  [REFRESH_NOTICES_REDUCER]: (state, action) => {
    const notices = [...state.notices]
    _.map(notices, (val, index) => {
      if (val.id === action.data.data.id) {
        val = Object.assign(val, action.data.data)
      }
    })
    return ({
      ...state,
      updating: false,
      notices: [...notices]
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  loading: false,
  updating: false,
  notices: [],
  delete: {},
  open: {},
  error: null
}

  export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
