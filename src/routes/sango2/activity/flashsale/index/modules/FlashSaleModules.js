/* global SANGO2_API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../../../../../../components/notification'
import {singOut} from '../../../../../../modules/login'
// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_FLASH_LIST = 'REQUEST_FLASH_LIST'
const RECEIVE_FLASH_LIST = 'RECEIVE_FLASH_LIST'

const KEEPING_FLASH = 'KEEPING_FLASH'

// ------------------------------------
// Actions
// ------------------------------------
function requestFlashList() {
  return {
    type: REQUEST_FLASH_LIST
  }
}
function receiveFlashList(data, products) {
  return {
    type: RECEIVE_FLASH_LIST,
    list: data,
    products
  }
}
function fetchFlashSales(value) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', value)
    dispatch(requestFlashList())
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/servers/${value.products[1]}/activitys/flashsale`
    axios({
      method: 'get',
      url: url,
      headers: {
        'productId': value.products[0],
        'serverId': value.products[1],
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      dispatch(receiveFlashList(data.data.domainObject, value.products))
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('warning', '登录过期', error.response.data.message, 3)
          dispatch(singOut())
        }
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}
function keepFlash(data) {
  return {
    type: KEEPING_FLASH,
    payload: data
  }
}

export {
  fetchFlashSales,
  keepFlash
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_FLASH_LIST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_FLASH_LIST]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      productId: action.products[0],
      serverId: action.products[1],
      list: [...action.list]
    })
  },
  [KEEPING_FLASH]: (state, action) => {
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
const initialState = {
  fetching: false,
  list: [],
  productId: '',
  serverId: '',
  keeping: {}
}
export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
