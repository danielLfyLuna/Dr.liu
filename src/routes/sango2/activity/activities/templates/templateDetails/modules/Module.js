/* global SANGO2_API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../../../../../../../components/notification'
import _ from 'lodash'
// import { notification } from 'antd'
// import zh from '../../../../../../intl/locales/zh-CN.json'
// import vi from '../../../../../../intl/locales/vi-VN.json'
// import en from '../../../../../../intl/locales/en-US.json'
//
// let locale = localStorage.getItem('locale')

// ------------------------------------
// Constants
// ------------------------------------
const ACT_TEMPLIST_REQUEST = 'ACT_TEMPLIST_REQUEST'
const ACT_TEMPLIST_REQUEST_ERR = 'ACT_TEMPLIST_REQUEST_ERR'
const ACT_TEMPLIST_RECEIVE = 'ACT_TEMPLIST_RECEIVE'

const ACT_SYNC_REQUEST = 'ACT_SYNC_REQUEST'
const ACT_SYNC_RECEIVE = 'ACT_SYNC_RECEIVE'

const ACT_UPDATE_RECEIVE = 'ACT_UPDATE_RECEIVE'

const ACT_DELETE_RECEIVE = 'ACT_DELETE_RECEIVE'

const ACT_TEMPLIST_TIME = 'ACT_TEMPLIST_TIME'


// ------------------------------------
// Actions
// ------------------------------------

function requestTemplates() {
  return {
    type: ACT_TEMPLIST_REQUEST
  }
}

function requestTemplatesErr(data) {
  return {
    type: ACT_TEMPLIST_REQUEST_ERR,
    payload: data
  }
}

function receiveTemplates(data) {
  return {
    type: ACT_TEMPLIST_RECEIVE,
    payload: data
  }
}

function storeTime(data) {
  return {
    type: ACT_TEMPLIST_TIME,
    payload: data
  }
}

function fetchActivityLists(data) {
  return (dispatch, getState) => {

    dispatch(requestTemplates())
    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/activitys/config`
    axios({
      method: 'GET',
      url: url,
      params: data.params,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveTemplates(response))
      dispatch(storeTime(data))
    }).catch(error => {
      if (error.response) {
        dispatch(requestTemplatesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function requestSync() {
  return {
    type: ACT_SYNC_REQUEST
  }
}

function receiveSync(data) {
  return {
    type: ACT_SYNC_RECEIVE,
    payload: data
  }
}

function syncBatchActivity(data) {
  return (dispatch, getState) => {

    dispatch(requestSync())
    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/activitys/sync`
    axios({
      method: 'PUT',
      url: url,
      data: data.params,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveSync(response))
      if (data.params.syncTime) {
        openNotificationWithIcon('success', '同步成功, 请等待定时开启')
      } else {
        openNotificationWithIcon('success', '同步成功')
      }
      dispatch(fetchActivityLists(getState().allTemplatesList.time))
      // let list = []
      // response.data.domainObject.map((v, i) => {
      //   list.push(v.groupId)
      // })
      // notification.warning({
      //   message: '同步未全部成功失败',
      //   description: `失败groupId: ${list.join(',')}`,
      //   duration: null
      // })
    }).catch(error => {
      if (error.response) {
        dispatch(requestTemplatesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}


function receiveUpdate(data) {
  return {
    type: ACT_UPDATE_RECEIVE,
    payload: data
  }
}

function updateBatchActivity(data) {
  return (dispatch) => {

    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/activitys/update`
    axios({
      method: 'PUT',
      url: url,
      data: data.data,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveUpdate(response))
      openNotificationWithIcon('success', '修改成功')
    }).catch(error => {
      if (error.response) {
        dispatch(requestTemplatesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}


function deleteUpdate(data) {
  return {
    type: ACT_DELETE_RECEIVE,
    payload: data
  }
}

function deleteBatchActivity(data) {
  return (dispatch) => {

    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/activitys/${data.groupId}`
    axios({
      method: 'DELETE',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(deleteUpdate(response))
      openNotificationWithIcon('success', '删除成功')
    }).catch(error => {
      if (error.response) {
        dispatch(requestTemplatesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchActivityLists,
  syncBatchActivity,
  updateBatchActivity,
  deleteBatchActivity
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACT_TEMPLIST_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: null,
      templates: []
    })
  },
  [ACT_TEMPLIST_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: action.payload ? { tips: action.payload.tips } : null
    })
  },
  [ACT_TEMPLIST_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      templates: action.payload.data ? action.payload.data.domainObject : []
    })
  },
  [ACT_SYNC_REQUEST]: (state) => {
    return ({
      ...state,
      syncing: true,
      err: null,
      sync: {}
    })
  },
  [ACT_SYNC_RECEIVE]: (state, action) => {
    return ({
      ...state,
      syncing: false,
      sync: action.payload.data
    })
  },
  [ACT_UPDATE_RECEIVE]: (state, action) => {
    _.map(state.templates, (v, i) => {
      if (v.groupId === action.payload.data.domainObject.groupId) {
        state.templates[i] = action.payload.data.domainObject
      }
    })
    return ({
      ...state,
      update: action.payload.data.domainObject
    })
  },
  [ACT_DELETE_RECEIVE]: (state, action) => {
    _.map(state.templates, (v, i) => {
      if (v.groupId === action.payload.data.domainObject.groupId) {
        state.templates = _.filter(state.templates, (v) => v.groupId !== action.payload.data.domainObject.groupId)
      }
    })
    return ({
      ...state,
      delete: action.payload.data.domainObject
    })
  },
  [ACT_TEMPLIST_TIME]: (state, action) => {
    return ({
      ...state,
      time: action.payload
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  syncing: false,
  err: null,
  templates: [],
  sync: {},
  update: {},
  delete: {},
  time: {}
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
