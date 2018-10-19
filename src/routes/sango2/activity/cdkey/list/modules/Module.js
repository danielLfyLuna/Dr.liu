/* global SANGO2_API_HOST */
import axios from 'axios'
import _ from 'lodash'

import openNotificationWithIcon from '../../../../../../components/notification'
import { baseInfoXlsz } from './exportXlsz'
// ------------------------------------
// Constants
// ------------------------------------
const CDKEY_LIST_REQUEST = 'CDKEY_LIST_REQUEST'
const CDKEY_LIST_REQUEST_ERR = 'CDKEY_LIST_REQUEST_ERR'
const CDKEY_LIST_RECEIVE = 'CDKEY_LIST_RECEIVE'
const CDKEY_LIST_CLEAR = 'CDKEY_LIST_CLEAR'

const CDKEY_CREATE_REQUEST = 'CDKEY_CREATE_REQUEST'
const CDKEY_CREATE_REQUEST_ERR = 'CDKEY_CREATE_REQUEST_ERR'
const CDKEY_CREATE_RECEIVE = 'CDKEY_CREATE_RECEIVE'

const CDKEY_UPDATE_REQUEST = 'CDKEY_UPDATE_REQUEST'
const CDKEY_UPDATE_REQUEST_ERR = 'CDKEY_UPDATE_REQUEST_ERR'
const CDKEY_UPDATE_RECEIVE = 'CDKEY_UPDATE_RECEIVE'

const CDKEY_QUERY_REQUEST = 'CDKEY_QUERY_REQUEST'
const CDKEY_QUERY_REQUEST_ERR = 'CDKEY_QUERY_REQUEST_ERR'
const CDKEY_QUERY_RECEIVE = 'CDKEY_QUERY_RECEIVE'

const CDKEY_GENERATE_REQUEST = 'CDKEY_GENERATE_REQUEST'
const CDKEY_GENERATE_REQUEST_ERR = 'CDKEY_GENERATE_REQUEST_ERR'
const CDKEY_GENERATE_RECEIVE = 'CDKEY_GENERATE_RECEIVE'

const CDKEY_GENERATE_LOG_REQUEST = 'CDKEY_GENERATE_LOG_REQUEST'
const CDKEY_GENERATE_LOG_REQUEST_ERR = 'CDKEY_GENERATE_LOG_REQUEST_ERR'
const CDKEY_GENERATE_LOG_RECEIVE = 'CDKEY_GENERATE_LOG_RECEIVE'

const CHANNEL_GIFT_LIST_REQUEST = 'CHANNEL_GIFT_LIST_REQUEST'
const CHANNEL_GIFT_LIST_REQUEST_ERR = 'CHANNEL_GIFT_LIST_REQUEST_ERR'
const CHANNEL_GIFT_LIST_RECEIVE = 'CHANNEL_GIFT_LIST_RECEIVE'
const CHANNEL_GIFT_LIST_CLEAR = 'CHANNEL_GIFT_LIST_CLEAR'

const CHANNEL_GIFT_CREATE_REQUEST = 'CHANNEL_GIFT_CREATE_REQUEST'
const CHANNEL_GIFT_CREATE_REQUEST_ERR = 'CHANNEL_GIFT_CREATE_REQUEST_ERR'
const CHANNEL_GIFT_CREATE_RECEIVE = 'CHANNEL_GIFT_CREATE_RECEIVE'

const CHANNEL_GIFT_DELETE_REQUEST = 'CHANNEL_GIFT_DELETE_REQUEST'
const CHANNEL_GIFT_DELETE_REQUEST_ERR = 'CHANNEL_GIFT_DELETE_REQUEST_ERR'
const CHANNEL_GIFT_DELETE_RECEIVE = 'CHANNEL_GIFT_DELETE_RECEIVE'

const CDKEY_KEEPING = 'CDKEY_KEEPING'

// ------------------------------------
// Actions
// ------------------------------------

function requestCDKeys() {
  return {
    type: CDKEY_LIST_REQUEST
  }
}

function requestCDKeysErr(data) {
  return {
    type: CDKEY_LIST_REQUEST_ERR,
    payload: data
  }
}

function receiveCDKeys(data) {
  return {
    type: CDKEY_LIST_RECEIVE,
    payload: data
  }
}

function clearCDKeys() {
  return {
    type: CDKEY_LIST_CLEAR
  }
}

function requestCDKeyCreate() {
  return {
    type: CDKEY_CREATE_REQUEST
  }
}

function requestCDKeyCreateErr(data) {
  return {
    type: CDKEY_CREATE_REQUEST_ERR,
    payload: data
  }
}

function receiveCDKeyCreate(data) {
  return {
    type: CDKEY_CREATE_RECEIVE,
    payload: data
  }
}

function requestCDKeyUpdate() {
  return {
    type: CDKEY_UPDATE_REQUEST
  }
}

function requestCDKeyUpdateErr(data) {
  return {
    type: CDKEY_UPDATE_REQUEST_ERR,
    payload: data
  }
}

function receiveCDKeyUpdate(data) {
  return {
    type: CDKEY_UPDATE_RECEIVE,
    payload: data
  }
}

function requestCDKeyQuery() {
  return {
    type: CDKEY_QUERY_REQUEST
  }
}

function requestCDKeyQueryErr(data) {
  return {
    type: CDKEY_QUERY_REQUEST_ERR,
    payload: data
  }
}

function receiveCDKeyQuery(data) {
  return {
    type: CDKEY_QUERY_RECEIVE,
    payload: data
  }
}

function requestCDKeyGenerate() {
  return {
    type: CDKEY_GENERATE_REQUEST
  }
}

function requestCDKeyGenerateErr(data) {
  return {
    type: CDKEY_GENERATE_REQUEST_ERR,
    payload: data
  }
}

function receiveCDKeyGenerate(data) {
  return {
    type: CDKEY_GENERATE_RECEIVE,
    payload: data
  }
}

function requestCDKeyGenerateLog() {
  return {
    type: CDKEY_GENERATE_LOG_REQUEST
  }
}

function requestCDKeyGenerateLogErr(data) {
  return {
    type: CDKEY_GENERATE_REQUEST_ERR,
    payload: data
  }
}

function receiveCDKeyGenerateLog(data) {
  return {
    type: CDKEY_GENERATE_LOG_RECEIVE,
    payload: data
  }
}

function requestChannelGifts() {
  return {
    type: CHANNEL_GIFT_LIST_REQUEST
  }
}

function requestChannelGiftsErr(data) {
  return {
    type: CHANNEL_GIFT_LIST_REQUEST_ERR,
    payload: data
  }
}

function receiveChannelGifts(data) {
  return {
    type: CHANNEL_GIFT_LIST_RECEIVE,
    payload: data
  }
}

function clearChannelGifts() {
  return {
    type: CHANNEL_GIFT_LIST_CLEAR
  }
}


function requestChannelGiftCreate() {
  return {
    type: CHANNEL_GIFT_CREATE_REQUEST
  }
}

function requestChannelGiftCreateErr(data) {
  return {
    type: CHANNEL_GIFT_CREATE_REQUEST_ERR,
    payload: data
  }
}

function receiveChannelGiftCreate(data) {
  return {
    type: CHANNEL_GIFT_CREATE_RECEIVE,
    payload: data
  }
}


function requestChannelGiftDelete() {
  return {
    type: CHANNEL_GIFT_DELETE_REQUEST
  }
}

function requestChannelGiftDeleteErr(data) {
  return {
    type: CHANNEL_GIFT_DELETE_REQUEST_ERR,
    payload: data
  }
}

function receiveChannelGiftDelete(data) {
  return {
    type: CHANNEL_GIFT_DELETE_RECEIVE,
    payload: data
  }
}

function keepCDKey(data) {
  return {
    type: CDKEY_KEEPING,
    payload: data
  }
}


function fetchCDKeys(data) {
  return (dispatch, getState) => {

    dispatch(requestCDKeys())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/activitys`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveCDKeys(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestCDKeysErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function createCDKey(data) {
  return (dispatch, getState) => {

    dispatch(requestCDKeyCreate())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/activitys`
    axios({
      method: 'POST',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveCDKeyCreate(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestCDKeyCreateErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateCDKey(data) {
  return (dispatch, getState) => {

    dispatch(requestCDKeyUpdate())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/activitys/${data.form.activityId}`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveCDKeyUpdate(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestCDKeyUpdateErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function generateCDKey(data) {
  return (dispatch, getState) => {

    dispatch(requestCDKeyGenerate())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/activitys/${data.path.activityId}/cdkeys`
    axios({
      method: 'POST',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveCDKeyGenerate(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestCDKeyGenerateErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchGenerateLog(data) {
  return (dispatch, getState) => {

    dispatch(requestCDKeyGenerateLog())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/activitys/${data.path.activityId}/cdkeys`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveCDKeyGenerateLog(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestCDKeyGenerateLogErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function queryCDKey(data) {
  return (dispatch, getState) => {

    dispatch(requestCDKeyQuery())
    let url = `${SANGO2_API_HOST}/products/_/activitys/cdkeys/${data.path.cdkey}`
    axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveCDKeyQuery(response))
      const value = response.data.domainObject
      if (value && value.cdkeyUsedLogList && value.cdkeyUserUsedList) {
        baseInfoXlsz(response.data.domainObject)
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestCDKeyQueryErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchChannelGifts(value) {
  return (dispatch, getState) => {
    dispatch(requestChannelGifts())
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/activitys/channelgift/link`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveChannelGifts(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestChannelGiftsErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function createChannelGift(value) {
  return (dispatch, getState) => {
    dispatch(requestChannelGiftCreate())
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/activitys/channelgift/link`
    return axios({
      method: 'POST',
      url: url,
      data: value.list,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveChannelGiftCreate(response))
      openNotificationWithIcon('success', 'add successfully')
      dispatch(fetchChannelGifts(value))
    }).catch(error => {
      if (error.response) {
        dispatch(requestChannelGiftCreateErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function deleteChannelGift(value) {
  return (dispatch, getState) => {
    // dispatch(requestChannelGiftDelete())
    let url = `${SANGO2_API_HOST}/products/${value.productId}/activitys/channelgift/link`
    return axios({
      method: 'DELETE',
      url: url,
      data: value.list,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      // dispatch(receiveChannelGiftDelete(response))
      openNotificationWithIcon('success', 'delete successfully')
    }).catch(error => {
      if (error.response) {
        dispatch(requestChannelGiftDeleteErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  clearCDKeys,
  fetchCDKeys,
  createCDKey,
  updateCDKey,
  generateCDKey,
  keepCDKey,
  fetchGenerateLog,
  queryCDKey,
  fetchChannelGifts,
  clearChannelGifts,
  createChannelGift,
  deleteChannelGift,
  requestChannelGiftDelete,
  receiveChannelGiftDelete
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CDKEY_LIST_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      list: []
    })
  },
  [CDKEY_LIST_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload.data.domainObject
    })
  },
  [CDKEY_LIST_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      list: []
    })
  },
  [CDKEY_LIST_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.tips }
    })
  },
  [CDKEY_CREATE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      create: {}
    })
  },
  [CDKEY_CREATE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.tips } : {}
    })
  },
  [CDKEY_CREATE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      create: action.payload.data
    })
  },
  [CDKEY_UPDATE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      update: {}
    })
  },
  [CDKEY_UPDATE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.tips } : {}
    })
  },
  [CDKEY_UPDATE_RECEIVE]: (state, action) => {
    const list = [...state.list]
    const cdkey = action.payload.data
    _.map(list, (val, index) => {
      if (cdkey.activityId && val.activityId === cdkey.activityId) {
        val = Object.assign(val, cdkey)
      }
    })
    return ({
      ...state,
      fetching: false,
      list: [...list],
      update: cdkey
    })
  },
  [CDKEY_GENERATE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      generate: {}
    })
  },
  [CDKEY_GENERATE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.tips } : {}
    })
  },
  [CDKEY_GENERATE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      generate: action.payload.data
    })
  },


  [CDKEY_GENERATE_LOG_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      generateLogs: []
    })
  },
  [CDKEY_GENERATE_LOG_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.tips } || {}
    })
  },
  [CDKEY_GENERATE_LOG_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      generateLogs: action.payload.data.domainObject || []
    })
  },


  [CDKEY_QUERY_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      query: {}
    })
  },
  [CDKEY_QUERY_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.tips } : {}
    })
  },
  [CDKEY_QUERY_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      query: action.payload.data.domainObject || {}
    })
  },
  [CHANNEL_GIFT_LIST_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      channel: []
    })
  },
  [CHANNEL_GIFT_LIST_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      channel: action.payload.data.domainObject
    })
  },
  [CHANNEL_GIFT_LIST_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      channel: []
    })
  },
  [CHANNEL_GIFT_LIST_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.tips } : {}
    })
  },
  [CHANNEL_GIFT_CREATE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      createGift: {}
    })
  },
  [CHANNEL_GIFT_CREATE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.tips } : {}
    })
  },
  [CHANNEL_GIFT_CREATE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      createGift: action.payload.data
    })
  },
  [CHANNEL_GIFT_DELETE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      deleteGift: {}
    })
  },
  [CHANNEL_GIFT_DELETE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.tips } : {}
    })
  },
  [CHANNEL_GIFT_DELETE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      deleteGift: action.payload.data
    })
  },
  [CDKEY_KEEPING]: (state, action) => {
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
  create: {},
  update: {},
  generate: {},
  generateLogs: [],
  query: {},
  channel: [],
  createGift: {},
  deleteGift: {},
  keeping: {}
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
