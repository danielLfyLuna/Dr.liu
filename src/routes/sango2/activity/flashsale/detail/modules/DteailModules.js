/* global SANGO2_API_HOST */
import axios from 'axios'
import _ from 'lodash'

import openNotificationWithIcon from '../../../../../../components/notification'
import {singOut} from '../../../../../../modules/login'
// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_DETAIL = 'REQUEST_DETAIL'
const RECEIVE_DETAIL = 'RECEIVE_DETAIL'
const REQUEST_UPDATE = 'REQUEST_UPDATE'
const RECEIVE_UPDATE = 'RECEIVE_UPDATE'

// ------------------------------------
// Actions
// ------------------------------------
function requestDetail() {
  return {
    type: REQUEST_DETAIL
  }
}
function receiveDetail(data) {
  return {
    type: RECEIVE_DETAIL,
    data: data
  }
}
function requestUpdate() {
  return {
    type: REQUEST_UPDATE
  }
}
function receiveUpdate() {
  return {
    type: RECEIVE_UPDATE
  }
}
function fetchDetail(value) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', value)
    dispatch(requestDetail())
    let url = `${SANGO2_API_HOST}/products/${value.product}/servers/${value.server}/activitys/flashsale/${value.id}`
    axios({
      method: 'get',
      url: url,
      headers: {
        'productId': value.product,
        'serverId': value.server,
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      dispatch(receiveDetail(data.data))
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

function updateFlashSale(value, data, params) {
  return (dispatch, getState) => {
    console.info('form: ', value)
    console.log('data: ', data)
    console.log('params: ', params)

    // 获取并生成数组
    let saleList = []
    _.forEach(value, (value, key) => {
      let arr = []
      // console.log(value, key)
      if (key.search(/-/) > 0) {
        arr = key.split('-')
        arr[3] = value
        saleList.push(arr)
      }
    })

    // 分类
    let saleObj = {}
    _.forEach(saleList, (value, index) => {
      saleObj[value[2]] = {}
    })

    _.forEach(saleList, (value, index) => {
      saleObj[value[2]][value[1]] = value[3]
    })

    // console.log(saleObj)

    // 合并数据
    let saleListClone = _.cloneDeep(data.saleList)
    _.forEach(saleListClone, (value, index) => {
      value.itemNum = _.toNumber(saleObj[value.saleId].itemNum)
      value.price = _.toNumber(saleObj[value.saleId].price)
      value.realPrice = _.toNumber(saleObj[value.saleId].realPrice)
      value.item = saleObj[value.saleId].item
    })

    // console.log(saleListClone[0], data.saleList[0])

    let fixListClone = _.cloneDeep(data.saleList)
    _.forEach(fixListClone, (value, index) => {
      value.itemNum = _.toNumber(saleObj[value.saleId].itemNum)
      value.price = _.toNumber(saleObj[value.saleId].price)
      value.realPrice = _.toNumber(saleObj[value.saleId].realPrice)
      value.item = saleObj[value.saleId].item
    })

    // console.log(fixListClone[0], data.saleList[0])

    dispatch(requestUpdate())
    let url = `${SANGO2_API_HOST}/products/${params.product}/servers/${params.server}/activitys/flashsale/${params.id}`
    axios({
      method: 'put',
      url: url,
      data: Object.assign({}, data, {
        freshInterval: value.freshInterval,
        dayEndTime: value.dayEndTime.hour(),
        dayStartTime: value.dayStartTime.hour(),
        startTime: value.startTime.unix(),
        endTime: value.endTime.unix(),
        serverIdList: value.servers,
        saleList: saleListClone,
        fixList: fixListClone
      }),
      headers: {
        'productId': params.product,
        'serverId': params.server,
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      // console.log(data)
      openNotificationWithIcon('success', '更新成功')
      dispatch(receiveUpdate())
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

export {
  fetchDetail,
  updateFlashSale
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_DETAIL]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_DETAIL]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      data: Object.assign({}, ...state, action.data)
    })
  },
  [REQUEST_UPDATE]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_UPDATE]: (state, action) => {
    return ({
      ...state,
      fetching: false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  data: {}
}
export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
