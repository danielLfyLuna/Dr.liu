/* global SANGO2_API_HOST */
import axios from 'axios'
import { singOut } from './login'
import openNotificationWithIcon from '../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_ITEMS = 'REQUEST_ITEMS'
const RECEIVE_ITEMS = 'RECEIVE_ITEMS'


// ------------------------------------
// Actions
// ------------------------------------
function requestItems() {
  return {
    type: REQUEST_ITEMS
  }
}
function receiveItems(data) {
  return {
    type: RECEIVE_ITEMS,
    items: data
  }
}

/**
 * [isLoginActionCreator 登录异步请求]
 * @param  {Object}  [value={}] [表单]
 * @return {Boolean}            [action]
 */
export function itemsActionCreator(value = {}, type = 0) {
  return (dispatch, getState) => {
    dispatch(requestItems())
    let url = `${SANGO2_API_HOST}/products/${value[0]}/items/${type}`
    axios({
      method: 'get',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      dispatch(receiveItems(data.data.domainObject))
    }).catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('warning', '登录过期', error.response.data.message, 3)
          dispatch(singOut())
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
    })
  }
}

export const actions = {
  itemsActionCreator
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_ITEMS]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_ITEMS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      data: Object.assign({}, ...state, action.items)
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false, // 是否正在请求
  data: {}
}
export default function itemsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
