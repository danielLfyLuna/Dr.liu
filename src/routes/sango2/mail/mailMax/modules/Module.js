/* global SANGO2_API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const MAIL_MAXPRICE_REQUEST = 'MAIL_MAXPRICE_REQUEST'
const MAIL_MAXPRICE_RECEIVE = 'MAIL_MAXPRICE_RECEIVE'

const MAIL_MAXPRICE_UPDATE_REQUEST = 'MAIL_MAXPRICE_UPDATE_REQUEST'
const MAIL_MAXPRICE_UPDATE_RECEIVE = 'MAIL_MAXPRICE_UPDATE_RECEIVE'

const MAIL_MAXPRICE_ERR = 'MAIL_MAXPRICE_ERR'
// ------------------------------------
// Actions
// ------------------------------------

function requestMax() {
  return {
    type: MAIL_MAXPRICE_REQUEST
  }
}

function receiveMax(data) {
  return {
    type: MAIL_MAXPRICE_RECEIVE,
    payload: data
  }
}

function requestMaxUpdate() {
  return {
    type: MAIL_MAXPRICE_UPDATE_REQUEST
  }
}

function receiveMaxUpdate(data) {
  return {
    type: MAIL_MAXPRICE_UPDATE_RECEIVE,
    payload: data
  }
}

function maxErr(data) {
  return {
    type: MAIL_MAXPRICE_ERR,
    payload: data
  }
}

function fetchMax(val) {
  return (dispatch, getState) => {
    dispatch(requestMax())
    let url = `${SANGO2_API_HOST}/products/${val}/mails/getMailPriceMaxAll`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveMax(response))
    }).catch(error => {
      if (error.response) {
        dispatch(maxErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateMax(val) {
  return (dispatch, getState) => {
    dispatch(requestMaxUpdate())
    let url = `${SANGO2_API_HOST}/products/${val.product}/mails/updateMailPriceMaxById`
    return axios({
      method: 'GET',
      url: url,
      params: val.list,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveMaxUpdate(response))
      openNotificationWithIcon('success', '修改成功')
      dispatch(fetchMax('_'))
    }).catch(error => {
      if (error.response) {
        dispatch(maxErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchMax,
  updateMax
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MAIL_MAXPRICE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: null
    })
  },
  [MAIL_MAXPRICE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload.data.mailPriceMaxAll
    })
  },
  [MAIL_MAXPRICE_UPDATE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: null
    })
  },
  [MAIL_MAXPRICE_UPDATE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false
    })
  },
  [MAIL_MAXPRICE_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
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
  list: []
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
