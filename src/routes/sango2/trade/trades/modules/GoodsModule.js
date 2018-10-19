/* global SANGO2_API_HOST */
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
const GOODS_TRADE_REQUEST = 'GOODS_TRADE_REQUEST'
const GOODS_TRADE_RECEIVE = 'GOODS_TRADE_RECEIVE'


// ------------------------------------
// Actions
// ------------------------------------
function requestGoodsMap() {
  return {
    type: GOODS_TRADE_REQUEST
  }
}
function receiveGoodsMap(data) {
  return {
    type: GOODS_TRADE_RECEIVE,
    payload: data
  }
}


function fetchTradeGoods(data) {
  return (dispatch, getState) => {
    dispatch(requestGoodsMap())
    let url = `${SANGO2_API_HOST}/products/${data.productId}/items/options`
    return axios({
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
  fetchTradeGoods
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GOODS_TRADE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [GOODS_TRADE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      options: action.payload.data.domainObject
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false, // 是否正在请求
  options: {}
}

export default function goodsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
