/* global SANGO2_API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../../../../../../../components/notification'

// import zh from '../../../../../../intl/locales/zh-CN.json'
// import vi from '../../../../../../intl/locales/vi-VN.json'
// import en from '../../../../../../intl/locales/en-US.json'
//
// let locale = localStorage.getItem('locale')

// ------------------------------------
// Constants
// ------------------------------------
const ACT_TEP_DETAIL_REQUEST = 'ACT_TEP_DETAIL_REQUEST'
const ACT_TEP_DETAIL_ERR = 'ACT_TEP_DETAIL_ERR'
const ACT_TEP_DETAIL_RECEIVE = 'ACT_TEP_DETAIL_RECEIVE'


// ------------------------------------
// Actions
// ------------------------------------

function requestTemplates() {
  return {
    type: ACT_TEP_DETAIL_REQUEST
  }
}

function requestTemplatesErr(data) {
  return {
    type: ACT_TEP_DETAIL_ERR,
    payload: data
  }
}

function receiveTemplates(data) {
  return {
    type: ACT_TEP_DETAIL_RECEIVE,
    payload: data
  }
}

function getDetail(data) {
  return (dispatch, getState) => {

    dispatch(requestTemplates())
    let url = `${SANGO2_API_HOST}/products/${data.productId}/servers/${data.serverId}/activitys/groupId?groupId=${data.groupId}`
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

export {
  getDetail
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACT_TEP_DETAIL_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: null,
      templates: []
    })
  },
  [ACT_TEP_DETAIL_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: action.payload ? { tips: action.payload.tips } : null
    })
  },
  [ACT_TEP_DETAIL_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      templates: action.payload.data ? action.payload.data.domainObject : []
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  err: null,
  templates: []
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
