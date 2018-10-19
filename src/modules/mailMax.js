/* global SANGO2_API_HOST */
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
const PRICE_MAX_REQUEST = 'PRICE_MAX_REQUEST'
const PRICE_MAX_RECEIVE = 'PRICE_MAX_RECEIVE'


// ------------------------------------
// Actions
// ------------------------------------
function requestMax() {
  return {
    type: PRICE_MAX_REQUEST
  }
}
function receiveMax(data) {
  return {
    type: PRICE_MAX_RECEIVE,
    payload: data
  }
}


function fetchPriceMax(v) {
  return (dispatch, getState) => {
    dispatch(requestMax())
    let url = `${SANGO2_API_HOST}/products/_/mails/getMailPriceMaxById`
    axios({
      method: 'GET',
      url: url,
      params: v,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveMax(response))
    }).catch(error => {
      if (error.response) {
        console.log(error.response.data)
      } else {
        // 一些错误是在设置请求的时候触发
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchPriceMax
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PRICE_MAX_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [PRICE_MAX_RECEIVE]: (state, action) => {
    console.log(action.payload)
    return ({
      ...state,
      fetching: false,
      list: action.payload.data.maxPrice
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false, // 是否正在请求
  list: {}
}

export default function goodsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
