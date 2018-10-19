/* global SANGO2_API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------

const COUNTRY_SERVER_RECEIVE = 'COUNTRY_SERVER_RECEIVE'

const VERSUS_SERVER_RECEIVE = 'VERSUS_SERVER_RECEIVE'

const VERSUS_SERVER_SENDING = 'VERSUS_SERVER_SENDING'
const VERSUS_SERVER_SENDED = 'VERSUS_SERVER_SENDED'

const COUNTRY_SERVER_SENDING = 'COUNTRY_SERVER_SENDING'
const COUNTRY_SERVER_SENDED = 'COUNTRY_SERVER_SENDED'

const WORLDCUP_ERR = 'WORLDCUP_ERR'
// ------------------------------------
// Actions
// ------------------------------------

function worldErr(data) {
  return {
    type: WORLDCUP_ERR,
    payload: data
  }
}

function versusServerList(data) {
  return {
    type: VERSUS_SERVER_RECEIVE,
    payload: data
  }
}
function countryServerList(data) {
  return {
    type: COUNTRY_SERVER_RECEIVE,
    payload: data
  }
}

function versusServerSending() {
  return {
    type: VERSUS_SERVER_SENDING
  }
}
function versusServerSended(data) {
  return {
    type: VERSUS_SERVER_SENDED,
    payload: data
  }
}
function versusCountrySending() {
  return {
    type: COUNTRY_SERVER_SENDING
  }
}
function versusCountrySended(data) {
  return {
    type: COUNTRY_SERVER_SENDED,
    payload: data
  }
}

function fetchVersusServers(data) {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/worldcup/${data}/score`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(versusServerList(response))
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
function fetchCountryServers(data) {
  return (dispatch, getState) => {
    let url = `${SANGO2_API_HOST}/worldcup/${data}/index`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(countryServerList(response))
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

function updateVersusServers(data) {
  return (dispatch, getState) => {
    dispatch(versusServerSending())
    let url = `${SANGO2_API_HOST}/worldcup/${data}/score`
    return axios({
      method: 'PUT',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(versusServerSended(response))
      if (response.data.failList.length === 0) { openNotificationWithIcon('success', '全部发送成功') }
      else { openNotificationWithIcon('success', '发送未全部成功') }
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
function updateCountryServers(data) {
  return (dispatch, getState) => {
    dispatch(versusCountrySending())
    let url = `${SANGO2_API_HOST}/worldcup/${data}/index`
    return axios({
      method: 'PUT',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(versusCountrySended(response))
      if (response.data.failList.length === 0) { openNotificationWithIcon('success', '全部发送成功') }
      else { openNotificationWithIcon('success', '发送未全部成功') }
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
  fetchVersusServers,
  fetchCountryServers,
  updateVersusServers,
  updateCountryServers
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [VERSUS_SERVER_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: null,
      verSer: action.payload.data.failList
    })
  },
  [COUNTRY_SERVER_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: null,
      countrySer: action.payload.data.failList
    })
  },
  [VERSUS_SERVER_SENDING]: (state) => {
    return ({
      ...state,
      loading: true
    })
  },
  [VERSUS_SERVER_SENDED]: (state, action) => {
    return ({
      ...state,
      loading: false,
      err: null,
      versusItem: action.payload.data.failList
    })
  },
  [COUNTRY_SERVER_SENDING]: (state) => {
    return ({
      ...state,
      loading: true
    })
  },
  [COUNTRY_SERVER_SENDED]: (state, action) => {
    return ({
      ...state,
      loading: false,
      err: null,
      countryItem: action.payload.data.failList
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
  verSer: [],
  countrySer: [],
  versusItem: [],
  countryItem: []
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
