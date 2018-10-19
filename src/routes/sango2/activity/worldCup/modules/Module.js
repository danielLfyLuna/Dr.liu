/* global SANGO2_API_HOST */
import axios from 'axios'
import _ from 'lodash'
import openNotificationWithIcon from '../../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const WORLDCUP_VERSUS_REQUEST = 'WORLDCUP_VERSUS_REQUEST'
const WORLDCUP_VERSUS_RECEIVE = 'WORLDCUP_VERSUS_RECEIVE'

const WORLDCUP_COUNTRY_REQUEST = 'WORLDCUP_COUNTRY_REQUEST'
const WORLDCUP_COUNTRY_RECEIVE = 'WORLDCUP_COUNTRY_RECEIVE'

const WORLDCUP_VERSUS_POST = 'WORLDCUP_VERSUS_POST'

const WORLDCUP_COUNTRY_POST = 'WORLDCUP_COUNTRY_POST'

const WORLDCUP_ERR = 'WORLDCUP_ERR'
// ------------------------------------
// Actions
// ------------------------------------

function requestVersus() {
  return {
    type: WORLDCUP_VERSUS_REQUEST
  }
}
function receiveVersus(data) {
  return {
    type: WORLDCUP_VERSUS_RECEIVE,
    payload: data
  }
}
function requestCountry() {
  return {
    type: WORLDCUP_COUNTRY_REQUEST
  }
}
function receiveCountry(data) {
  return {
    type: WORLDCUP_COUNTRY_RECEIVE,
    payload: data
  }
}

function worldErr(data) {
  return {
    type: WORLDCUP_ERR,
    payload: data
  }
}

function responseVersus(data, val) {
  return {
    type: WORLDCUP_VERSUS_POST,
    payload: { data: data, list: val }
  }
}
function responseCountry(data, val) {
  return {
    type: WORLDCUP_COUNTRY_POST,
    payload: { data: data, list: val }
  }
}

function fetchVersus(val) {
  return (dispatch, getState) => {
    dispatch(requestVersus())
    let url = `${SANGO2_API_HOST}/products/${val.productId}/servers/${val.serverId}/worldcup/versus`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveVersus(response))
    }).catch(error => {
      if (error.response) {
        dispatch(worldErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchCountry(val) {
  return (dispatch, getState) => {
    dispatch(requestCountry())
    let url = `${SANGO2_API_HOST}/products/${val.productId}/servers/${val.serverId}/worldcup/country`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveCountry(response))
    }).catch(error => {
      if (error.response) {
        dispatch(worldErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function postVersus(data) {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/worldcup/score`
    return axios({
      method: 'POST',
      data: data,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(responseVersus(response, data))
      openNotificationWithIcon('success', '操作成功')
    }).catch(error => {
      if (error.response) {
        dispatch(worldErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function postCountry(data) {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/worldcup/result`
    return axios({
      method: 'POST',
      data: data,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(responseCountry(response, data))
      openNotificationWithIcon('success', '操作成功')
    }).catch(error => {
      if (error.response) {
        dispatch(worldErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchVersus,
  fetchCountry,
  postVersus,
  postCountry
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [WORLDCUP_VERSUS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: null
    })
  },
  [WORLDCUP_VERSUS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      versus: action.payload.data.domainObject
    })
  },
  [WORLDCUP_COUNTRY_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: null
    })
  },
  [WORLDCUP_COUNTRY_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      country: action.payload.data.domainObject
    })
  },
  [WORLDCUP_VERSUS_POST]: (state, action) => {
    if (action.payload.data.data.msg.indexOf('操作成功') !== -1) {
      _.map(state.versus, (val) => {
        if (val.versusId === action.payload.list.versusId) {
          val.hostCountryScore = action.payload.list.hostCountryScore
          val.guestCountryScore = action.payload.list.guestCountryScore
        }
      })
    }
    return ({
      ...state,
      fetching: false,
      err: null
    })
  },
  [WORLDCUP_COUNTRY_POST]: (state, action) => {
    if (action.payload.data.data.msg.indexOf('操作成功') !== -1) {
      _.map(state.country, (val) => {
        if (val.countryId === action.payload.list.countryId) {
          val.index = action.payload.list.index
          val.eliminated = action.payload.list.eliminated
        }
      })
    }
    return ({
      ...state,
      fetching: false,
      err: null
    })
  },
  [WORLDCUP_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      loading: false,
      err: { tips: action.payload.tips }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  loading: false,
  err: null,
  versus: [],
  country: []
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
