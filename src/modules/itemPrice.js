/* global SANGO2_API_HOST */
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
const GOODS_PRICE_REQUEST = 'GOODS_PRICE_REQUEST'
const GOODS_PRICE_RECEIVE = 'GOODS_PRICE_RECEIVE'


// ------------------------------------
// Actions
// ------------------------------------
function requestGoodsMap() {
  return {
    type: GOODS_PRICE_REQUEST
  }
}
function receiveGoodsMap(data) {
  return {
    type: GOODS_PRICE_RECEIVE,
    payload: data
  }
}


function fetchItemPrice() {
  return (dispatch, getState) => {
    dispatch(requestGoodsMap())
    let url = `${SANGO2_API_HOST}/products/_/items/selRewardItemAll`
    axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveGoodsMap(response))
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
  fetchItemPrice
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GOODS_PRICE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [GOODS_PRICE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      options: action.payload.data.listRewardItem
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false, // 是否正在请求
  options: []
}

export default function goodsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
