/* global SANGO2_API_HOST */
import axios from 'axios'
import { notification } from 'antd'

import zh from '../../../../../../intl/locales/zh-CN.json'
import vi from '../../../../../../intl/locales/vi-VN.json'
import en from '../../../../../../intl/locales/en-US.json'
import openNotificationWithIcon from '../../../../../../components/notification'

let locale = localStorage.getItem('locale')
// const message = defineMessages({
//   waiting: {
//     id: 'NOTIFICATION.WAITING',
//     defaultMessage: '正在请求,请不要重复点击提交'
//   },
//   result_add: {
//     id: 'NOTIFICATION.RESULT_ADD',
//     defaultMessage: '活动添加结果'
//   },
//   result_update: {
//     id: 'NOTIFICATION.RESULT_UPDATE',
//     defaultMessage: '活动更新结果'
//   }
// })

// ------------------------------------
// Constants
// ------------------------------------
const ACTIVITIES_LIST_REQUEST = 'ACTIVITIES_LIST_REQUEST'
const ACTIVITIES_LIST_REQUEST_ERR = 'ACTIVITIES_LIST_REQUEST_ERR'
const ACTIVITIES_LIST_RECEIVE = 'ACTIVITIES_LIST_RECEIVE'
const ACTIVITIES_LIST_CLEAR = 'ACTIVITIES_LIST_CLEAR'

const ACTIVITIES_TEMPLATES_REQUEST = 'ACTIVITIES_TEMPLATES_REQUEST'
const ACTIVITIES_TEMPLATES_REQUEST_ERR = 'ACTIVITIES_TEMPLATES_REQUEST_ERR'
const ACTIVITIES_TEMPLATES_RECEIVE = 'ACTIVITIES_TEMPLATES_RECEIVE'

const ACTIVITIES_TEMPLATE_ADD_REQUEST = 'ACTIVITIES_TEMPLATE_ADD_REQUEST'
const ACTIVITIES_TEMPLATE_ADD_REQUEST_ERR = 'ACTIVITIES_TEMPLATE_ADD_REQUEST_ERR'
const ACTIVITIES_TEMPLATE_ADD_RECEIVE = 'ACTIVITIES_TEMPLATE_ADD_RECEIVE'
const ACTIVITIES_TEMPLATE_ADD_CLEAR = 'ACTIVITIES_TEMPLATE_ADD_CLEAR'

const ACTIVITIES_SWITCH_REQUEST = 'ACTIVITIES_SWITCH_REQUEST'
const ACTIVITIES_SWITCH_REQUEST_ERR = 'ACTIVITIES_SWITCH_REQUEST_ERR'
const ACTIVITIES_SWITCH_RECEIVE = 'ACTIVITIES_SWITCH_RECEIVE'

const ACTIVITIES_CONFIGURE_REQUEST = 'ACTIVITIES_CONFIGURE_REQUEST'
const ACTIVITIES_CONFIGURE_REQUEST_ERR = 'ACTIVITIES_CONFIGURE_REQUEST_ERR'
const ACTIVITIES_CONFIGURE_RECEIVE = 'ACTIVITIES_CONFIGURE_RECEIVE'

const ACTIVITIES_UPDATE_REQUEST = 'ACTIVITIES_UPDATE_REQUEST'
const ACTIVITIES_UPDATE_REQUEST_ERR = 'ACTIVITIES_UPDATE_REQUEST_ERR'
const ACTIVITIES_UPDATE_RECEIVE = 'ACTIVITIES_UPDATE_RECEIVE'

const ACTIVITIES_CREATE_REQUEST = 'ACTIVITIES_CREATE_REQUEST'
const ACTIVITIES_CREATE_REQUEST_ERR = 'ACTIVITIES_CREATE_REQUEST_ERR'
const ACTIVITIES_CREATE_RECEIVE = 'ACTIVITIES_CREATE_RECEIVE'
const ACTIVITIES_CREATE_CLEAR = 'ACTIVITIES_CREATE_CLEAR'

const ACTIVITIES_KEEPING = 'ACTIVITIES_KEEPING'

// ------------------------------------
// Actions
// ------------------------------------

function requestActivities() {
  return {
    type: ACTIVITIES_LIST_REQUEST
  }
}

function requestActivitiesErr(data) {
  return {
    type: ACTIVITIES_LIST_REQUEST_ERR,
    payload: data
  }
}

function receiveActivities(data) {
  return {
    type: ACTIVITIES_LIST_RECEIVE,
    payload: data
  }
}

function clearActivities() {
  return {
    type: ACTIVITIES_LIST_CLEAR
  }
}

function requestTemplates() {
  return {
    type: ACTIVITIES_TEMPLATES_REQUEST
  }
}

function requestTemplatesErr(data) {
  return {
    type: ACTIVITIES_TEMPLATES_REQUEST_ERR,
    payload: data
  }
}

function receiveTemplates(data) {
  return {
    type: ACTIVITIES_TEMPLATES_RECEIVE,
    payload: data
  }
}

function requestTemplateCreate() {
  return {
    type: ACTIVITIES_TEMPLATE_ADD_REQUEST
  }
}

function requestTemplateCreateErr(data) {
  return {
    type: ACTIVITIES_TEMPLATE_ADD_REQUEST_ERR,
    payload: data
  }
}

function receiveTemplateCreate(data) {
  return {
    type: ACTIVITIES_TEMPLATE_ADD_RECEIVE,
    payload: data
  }
}

function clearTemplateCreate() {
  return {
    type: ACTIVITIES_TEMPLATE_ADD_CLEAR
  }
}

function requestActivitySwitch() {
  return {
    type: ACTIVITIES_SWITCH_REQUEST
  }
}

function requestActivitySwitchErr(data) {
  return {
    type: ACTIVITIES_SWITCH_REQUEST_ERR,
    payload: data
  }
}

function receiveActivitySwitch(data) {
  return {
    type: ACTIVITIES_SWITCH_RECEIVE,
    payload: data
  }
}

function requestActivityConfigure() {
  return {
    type: ACTIVITIES_CONFIGURE_REQUEST
  }
}

function requestActivityConfigureErr(data) {
  return {
    type: ACTIVITIES_CONFIGURE_REQUEST_ERR,
    payload: data
  }
}

function receiveActivityConfigure(data) {
  return {
    type: ACTIVITIES_CONFIGURE_RECEIVE,
    payload: data
  }
}

function requestActivityUpdate() {
  return {
    type: ACTIVITIES_UPDATE_REQUEST
  }
}

function requestActivityUpdateErr(data) {
  return {
    type: ACTIVITIES_UPDATE_REQUEST_ERR,
    payload: data
  }
}

function receiveActivityUpdate(data) {
  return {
    type: ACTIVITIES_UPDATE_RECEIVE,
    payload: data
  }
}

function requestActivityCreate() {
  return {
    type: ACTIVITIES_CREATE_REQUEST
  }
}

function requestActivityCreateErr(data) {
  return {
    type: ACTIVITIES_CREATE_REQUEST_ERR,
    payload: data
  }
}

function receiveActivityCreate(data) {
  return {
    type: ACTIVITIES_CREATE_RECEIVE,
    payload: data
  }
}

function clearCreate() {
  return {
    type: ACTIVITIES_CREATE_CLEAR
  }
}

function requestGroupBuyUpdate() {
  return {
    type: ACTIVITIES_UPDATE_REQUEST
  }
}

function requestGroupBuyUpdateErr(data) {
  return {
    type: ACTIVITIES_UPDATE_REQUEST_ERR,
    payload: data
  }
}

function receiveGroupBuyUpdate(data) {
  return {
    type: ACTIVITIES_UPDATE_RECEIVE,
    payload: data
  }
}

function keepActivities(data) {
  return {
    type: ACTIVITIES_KEEPING,
    payload: data
  }
}


function fetchActivities(data) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().activities.fetching) {
      return
    }

    dispatch(requestActivities())
    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/activitys`
    axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveActivities(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestActivitiesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchTemplates(data) {
  return (dispatch, getState) => {

    dispatch(requestTemplates())
    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/activitys/templates`
    axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveTemplates(response))
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

function newCreateActivity(data) {
  return (dispatch, getState) => {
    dispatch(requestTemplateCreate())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/activitys/add`
    axios({
      method: 'POST',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveTemplateCreate(response))
      if (response.data.failServers.length > 0) {
        const result = response.data.failServers.map(server => `server：${server}，result：fail`)
        notification.warning({
          message: (
            locale == 'zh-CN' ?
            zh['NOTIFICATION.RESULT_ADD'] :
            locale == 'vi-VN' ?
            vi['NOTIFICATION.RESULT_ADD'] :
            locale == 'en-US' ? en['NOTIFICATION.RESULT_ADD'] :
            zh['NOTIFICATION.RESULT_ADD']
          ),
          description: result.join('；'),
          duration: 0,
          style: { width: 360 }
        })
      } else if (response.data.failServers.length == 0) {
        openNotificationWithIcon('success', 'success！')
        dispatch(fetchActivities(data.path))
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestTemplateCreateErr(error.response))
        notification.error({
          message: `${error.response.status}: ${error.response.data.error}`,
          description: error.response.data.message,
          duration: 0,
          style: { width: 360 }
        })
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function switchActivity(data) {
  return (dispatch, getState) => {
    if (getState().activities.fetching) {
      return
    }

    dispatch(requestActivitySwitch())
    openNotificationWithIcon(
      'warning',
      locale == 'zh-CN' ?
      zh['NOTIFICATION.WAITING'] :
      locale == 'vi-VN' ?
      vi['NOTIFICATION.WAITING'] :
      locale == 'en-US' ? en['NOTIFICATION.WAITING'] :
      zh['NOTIFICATION.WAITING']
    )
    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/activitys/${data.templateId}/switch/${data.switchKey}`
    axios({
      method: 'PUT',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveActivitySwitch(response))
      openNotificationWithIcon('success', 'success！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestActivitySwitchErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateActivity(data) {
  return (dispatch, getState) => {

    dispatch(requestActivityUpdate())
    openNotificationWithIcon(
      'warning',
      locale == 'zh-CN' ?
      zh['NOTIFICATION.WAITING'] :
      locale == 'vi-VN' ?
      vi['NOTIFICATION.WAITING'] :
      locale == 'en-US' ? en['NOTIFICATION.WAITING'] :
      zh['NOTIFICATION.WAITING']
    )
    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/activitys/${data.templateId}`
    axios({
      method: 'PUT',
      data: data,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveActivityUpdate(response))
      if (response.data.failServerIds.length > 0) {
        const result = response.data.failServerIds.map(server => `server: ${server}，result：fail`)
        notification.warning({
          message: (
            locale == 'zh-CN' ?
            zh['NOTIFICATION.RESULT_UPDATE'] :
            locale == 'vi-VN' ?
            vi['NOTIFICATION.RESULT_UPDATE'] :
            locale == 'en-US' ? en['NOTIFICATION.RESULT_UPDATE'] :
            zh['NOTIFICATION.RESULT_UPDATE']
          ),
          description: result.join('；'),
          duration: 0,
          style: { width: 360 }
        })
      } else if (response.data.failServerIds.length == 0 && response.data.successServerIds.length > 0) {
        openNotificationWithIcon('success', 'success！')
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestActivityUpdateErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function createActivity(data) {
  return (dispatch, getState) => {
    dispatch(requestActivityCreate())
    openNotificationWithIcon(
      'warning',
      locale == 'zh-CN' ?
      zh['NOTIFICATION.WAITING'] :
      locale == 'vi-VN' ?
      vi['NOTIFICATION.WAITING'] :
      locale == 'en-US' ? en['NOTIFICATION.WAITING'] :
      zh['NOTIFICATION.WAITING']
    )
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/${data.service}`
    axios({
      method: 'POST',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveActivityCreate(response))
      if (response.data.failServerIds.length > 0) {
        const result = response.data.failServerIds.map(server => `server：${server}，result：fail`)
        notification.warning({
          message: (
            locale == 'zh-CN' ?
            zh['NOTIFICATION.RESULT_ADD'] :
            locale == 'vi-VN' ?
            vi['NOTIFICATION.RESULT_ADD'] :
            locale == 'en-US' ? en['NOTIFICATION.RESULT_ADD'] :
            zh['NOTIFICATION.RESULT_ADD']
          ),
          description: result.join('；'),
          duration: 0,
          style: { width: 360 }
        })
      } else if (response.data.failServerIds.length == 0 && response.data.successServerIds.length > 0) {
        openNotificationWithIcon('success', 'success！')
        dispatch(fetchActivities(data.path))
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestActivityCreateErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchConfigure(data) {
  return (dispatch, getState) => {
    if (getState().activities.fetching) {
      return
    }

    dispatch(requestActivityConfigure())
    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/activitys/${data.templateId}/configure`
    axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveActivityConfigure(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestActivityConfigureErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateGroupBuy(data) {
  return (dispatch, getState) => {
    if (getState().activities.fetching) {
      return
    }

    dispatch(requestGroupBuyUpdate())
    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/activitys/groupbuy`
    axios({
      method: 'PUT',
      data: data,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveGroupBuyUpdate(response))
      if (response.data.failServerIds.length > 0) {
        const result = response.data.failServerIds.map(server => `server：${server}，result：fail`)
        notification.warning({
          message: (
            locale == 'zh-CN' ?
            zh['NOTIFICATION.RESULT_UPDATE'] :
            locale == 'vi-VN' ?
            vi['NOTIFICATION.RESULT_UPDATE'] :
            locale == 'en-US' ? en['NOTIFICATION.RESULT_UPDATE'] :
            zh['NOTIFICATION.RESULT_UPDATE']
          ),
          description: result.join('；'),
          duration: 0,
          style: { width: 360 }
        })
      } else if (response.data.failServerIds.length == 0 && response.data.successServerIds.length > 0) {
        openNotificationWithIcon('success', 'success！')
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestGroupBuyUpdateErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}


export {
  fetchActivities,
  fetchTemplates,
  newCreateActivity,
  clearTemplateCreate,
  clearActivities,
  switchActivity,
  updateActivity,
  createActivity,
  clearCreate,
  fetchConfigure,
  updateGroupBuy,
  keepActivities
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIVITIES_LIST_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      list: []
    })
  },
  [ACTIVITIES_LIST_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.tips } : {}
    })
  },
  [ACTIVITIES_LIST_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload.data ? action.payload.data.domainObject : []
    })
  },
  [ACTIVITIES_LIST_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      list: []
    })
  },
  [ACTIVITIES_TEMPLATES_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      templates: []
    })
  },
  [ACTIVITIES_TEMPLATES_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.tips } : {}
    })
  },
  [ACTIVITIES_TEMPLATES_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      templates: action.payload.data ? action.payload.data.domainObject : []
    })
  },
  [ACTIVITIES_TEMPLATE_ADD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      newCreate: {}
    })
  },
  [ACTIVITIES_TEMPLATE_ADD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [ACTIVITIES_TEMPLATE_ADD_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      newCreate: action.payload.data
    })
  },
  [ACTIVITIES_TEMPLATE_ADD_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      newCreate: {}
    })
  },
  [ACTIVITIES_SWITCH_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {}
    })
  },
  [ACTIVITIES_SWITCH_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [ACTIVITIES_SWITCH_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      switch: action.payload.data
    })
  },
  [ACTIVITIES_UPDATE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {}
    })
  },
  [ACTIVITIES_UPDATE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [ACTIVITIES_UPDATE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      update: action.payload.data
    })
  },
  [ACTIVITIES_CREATE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {}
    })
  },
  [ACTIVITIES_CREATE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [ACTIVITIES_CREATE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      create: action.payload.data
    })
  },
  [ACTIVITIES_CREATE_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      create: {}
    })
  },
  [ACTIVITIES_CONFIGURE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {}
    })
  },
  [ACTIVITIES_CONFIGURE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [ACTIVITIES_CONFIGURE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      config: action.payload.data
    })
  },
  [ACTIVITIES_KEEPING]: (state, action) => {
    return ({
      ...state,
      keeping: {
        ...state.keeping,
        ...action.payload
      }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  err: false,
  errMes: {},
  list: [],
  templates: [],
  newCreate: {},
  update: {},
  create: {},
  config: {},
  switch: {},
  keeping: {}
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
