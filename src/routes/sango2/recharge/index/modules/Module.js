/* global SANGO2_API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const ORDERS_REQUEST = 'ORDERS_REQUEST'
const ORDERS_REQUEST_ERR = 'ORDERS_REQUEST_ERR'
const ORDERS_RECEIVE = 'ORDERS_RECEIVE'
const ORDERS_CLEAR = 'ORDERS_CLEAR'

const ORDERS_EXPORT_REQUEST = 'ORDERS_EXPORT_REQUEST'
const ORDERS_EXPORT_REQUEST_ERR = 'ORDERS_EXPORT_REQUEST_ERR'
const ORDERS_EXPROT_RECEIVE = 'ORDERS_EXPROT_RECEIVE'

const ORDERS_REPAIR_REQUEST = 'ORDERS_REPAIR_REQUEST'
const ORDERS_REPAIR_REQUEST_ERR = 'ORDERS_REPAIR_REQUEST_ERR'
const ORDERS_REPAIR_RECEIVE = 'ORDERS_REPAIR_RECEIVE'

const RECHARGE_REQUEST = 'RECHARGE_REQUEST'
const RECHARGE_REQUEST_ERR = 'RECHARGE_REQUEST_ERR'
const RECHARGE_RECEIVE = 'RECHARGE_RECEIVE'

const RECHARGE_MAP_REQUEST = 'RECHARGE_MAP_REQUEST'
const RECHARGE_MAP_REQUEST_ERR = 'RECHARGE_MAP_REQUEST_ERR'
const RECHARGE_MAP_RECEIVE = 'RECHARGE_MAP_RECEIVE'

const RECHARGE_MONTHCARD_REQUEST = 'RECHARGE_MONTHCARD_REQUEST'
const RECHARGE_MONTHCARD_ERR = 'RECHARGE_MONTHCARD_ERR'
const RECHARGE_MONTHCARD_RECEIVE = 'RECHARGE_MONTHCARD_RECEIVE'

const RATES_REQUEST = 'RATES_REQUEST'
const RATES_REQUEST_ERR = 'RATES_REQUEST_ERR'
const RATES_RECEIVE = 'RATES_RECEIVE'
const RATES_CLEAR = 'RATES_CLEAR'

const RATES_CREATE_REQUEST = 'RATES_CREATE_REQUEST'
const RATES_CREATE_REQUEST_ERR = 'RATES_CREATE_REQUEST_ERR'
const RATES_CREATE_RECEIVE = 'RATES_CREATE_RECEIVE'

const RATES_DELETE_REQUEST = 'RATES_DELETE_REQUEST'
const RATES_DELETE_REQUEST_ERR = 'RATES_DELETE_REQUEST_ERR'
const RATES_DELETE_RECEIVE = 'RATES_DELETE_RECEIVE'

const RECHARGE_KEEPING = 'RECHARGE_KEEPING'

// ------------------------------------
// Actions
// ------------------------------------

function requestOrders() {
  return {
    type: ORDERS_REQUEST
  }
}

function requestOrdersErr(data) {
  return {
    type: ORDERS_REQUEST_ERR,
    payload: data
  }
}

function receiveOrders(data) {
  return {
    type: ORDERS_RECEIVE,
    payload: data
  }
}

function clearOrders() {
  return {
    type: ORDERS_CLEAR
  }
}

function requestOrderExport() {
  return {
    type: ORDERS_EXPORT_REQUEST
  }
}

function requestOrderExportErr(data) {
  return {
    type: ORDERS_EXPORT_REQUEST_ERR,
    payload: data
  }
}

function receiveOrderExport(data) {
  return {
    type: ORDERS_EXPROT_RECEIVE,
    payload: data
  }
}

function requestOrderRepair() {
  return {
    type: ORDERS_REPAIR_REQUEST
  }
}

function requestOrderRepairErr(data) {
  return {
    type: ORDERS_REPAIR_REQUEST_ERR,
    payload: data
  }
}

function receiveOrderRepair(data) {
  return {
    type: ORDERS_REPAIR_RECEIVE,
    payload: data
  }
}

function requestRecharge() {
  return {
    type: RECHARGE_REQUEST
  }
}

function requestRechargeErr(data) {
  return {
    type: RECHARGE_REQUEST_ERR,
    payload: data
  }
}

function receiveRecharge(data) {
  return {
    type: RECHARGE_RECEIVE,
    payload: data
  }
}

function requestRechargeMap() {
  return {
    type: RECHARGE_MAP_REQUEST
  }
}

function requestRechargeMapErr(data) {
  return {
    type: RECHARGE_MAP_REQUEST_ERR,
    payload: data
  }
}

function receiveRechargeMap(data) {
  return {
    type: RECHARGE_MAP_RECEIVE,
    payload: data
  }
}

function requestRates() {
  return {
    type: RATES_REQUEST
  }
}

function requestRatesErr(data) {
  return {
    type: RATES_REQUEST_ERR,
    payload: data
  }
}

function receiveRates(data) {
  return {
    type: RATES_RECEIVE,
    payload: data
  }
}

function clearRates() {
  return {
    type: RATES_CLEAR
  }
}

function requestRatesCreate() {
  return {
    type: RATES_CREATE_REQUEST
  }
}

function requestRatesCreateErr(data) {
  return {
    type: RATES_CREATE_REQUEST_ERR,
    payload: data
  }
}

function receiveRatesCreate(data) {
  return {
    type: RATES_CREATE_RECEIVE,
    payload: data
  }
}

function requestRatesDelete() {
  return {
    type: RATES_DELETE_REQUEST
  }
}

function requestRatesDeleteErr(data) {
  return {
    type: RATES_DELETE_REQUEST_ERR,
    payload: data
  }
}

function receiveRatesDelete(data) {
  return {
    type: RATES_DELETE_RECEIVE,
    payload: data
  }
}

function keepRecharge(data) {
  return {
    type: RECHARGE_KEEPING,
    payload: data
  }
}


function requestMonthCard() {
  return {
    type: RECHARGE_MONTHCARD_REQUEST
  }
}

function requestMonthCardErr(data) {
  return {
    type: RECHARGE_MONTHCARD_ERR,
    payload: data
  }
}

function receiveMonthCard() {
  return {
    type: RECHARGE_MONTHCARD_RECEIVE
  }
}

function fetchOrders(data) {
  return (dispatch) => {

    dispatch(requestOrders())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/pay/orders`
    return axios({
      method: 'GET',
      params: data.params,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveOrders(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestOrdersErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function orderExport(data) {
  return (dispatch) => {

    dispatch(requestOrderExport())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/pay/export`
    return axios({
      method: 'GET',
      params: data.params,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveOrderExport(response))
      if (response.data.downloadLink) {
        let link = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/pay/${response.data.downloadLink}`
        window.open(link)
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestOrderExportErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function orderRepair(data) {
  return (dispatch) => {

    dispatch(requestOrderRepair())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/pay/repair`
    axios({
      method: 'POST',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveOrderRepair(response))

      if (response.data.msg.includes('补单成功')) {
        openNotificationWithIcon('success', 'success！')
      } else {
        openNotificationWithIcon('warning', response.data.msg)
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestOrderRepairErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function sendRecharge(data) {
  return (dispatch) => {

    dispatch(requestRecharge())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/pay/recharge`
    axios({
      method: 'POST',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveRecharge(response))
      if (response.data.msg === 'OK') {
        openNotificationWithIcon('success', 'success！')
      } else if (response.data.msg === 'failed') {
        openNotificationWithIcon('error', 'fail！')
      } else {
        openNotificationWithIcon('info', response.data.msg)
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestRechargeErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchRechargeMap(data) {
  return (dispatch) => {

    dispatch(requestRechargeMap())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/pay/rechargemap`
    axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveRechargeMap(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestRechargeMapErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchRates(data) {
  return (dispatch) => {

    dispatch(requestRates())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/rebate/rates`
    axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveRates(response))
      openNotificationWithIcon('success', 'success！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestRatesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function createRate(data) {
  return (dispatch) => {

    dispatch(requestRatesCreate())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/rebate/rates`
    axios({
      method: 'POST',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveRatesCreate(response))
      openNotificationWithIcon('success', 'success！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestRatesCreateErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function deleteRate(data) {
  return (dispatch) => {

    dispatch(requestRatesDelete())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/rebate/${data.path.amount}`
    axios({
      method: 'DELETE',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveRatesDelete(response))
      openNotificationWithIcon('success', 'success！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestRatesDeleteErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function sendMonthCard(value) {
  return (dispatch, getState) => {
    if (getState().recharge.fetching) {
      return
    }
    dispatch(requestMonthCard())
    let url = `${SANGO2_API_HOST}/products/${value.productId}/servers/${value.serverId}/pay/recharge/monthcard`
    axios({
      method: 'POST',
      url: url,
      data: value.items,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveMonthCard())
      if (response.data.msg == '充值成功') {
        openNotificationWithIcon('success', response.data.msg)
      } else {
        openNotificationWithIcon('error', response.data.msg)
      }
    }).catch(error => {
      if (error.response) {
        dispatch(requestMonthCardErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchOrders,
  clearOrders,
  orderExport,
  orderRepair,
  sendRecharge,
  sendMonthCard,
  fetchRechargeMap,
  fetchRates,
  clearRates,
  createRate,
  deleteRate,
  keepRecharge
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ORDERS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      orders: []
    })
  },
  [ORDERS_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.response.data.tips }
    })
  },
  [ORDERS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      orders: action.payload.data.domainObject || []
    })
  },
  [ORDERS_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      orders: []
    })
  },
  [ORDERS_EXPORT_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      export: {}
    })
  },
  [ORDERS_EXPORT_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [ORDERS_EXPROT_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      export: action.payload.data
    })
  },
  [ORDERS_REPAIR_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      repair: {}
    })
  },
  [ORDERS_REPAIR_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [ORDERS_REPAIR_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      repair: action.payload.data
    })
  },
  [RECHARGE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      payment: {}
    })
  },
  [RECHARGE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [RECHARGE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      payment: action.payload.data
    })
  },
  [RECHARGE_MAP_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      remaps: []
    })
  },
  [RECHARGE_MAP_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [RECHARGE_MAP_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      remaps: action.payload.data.domainObject || [],
      groupList: action.payload.data.groupList || []
    })
  },
  [RATES_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      rates: []
    })
  },
  [RATES_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [RATES_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      rates: action.payload.data.domainObject || []
    })
  },
  [RATES_CREATE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      rateAdd: {}
    })
  },
  [RATES_CREATE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [RATES_CREATE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      rateAdd: action.payload.data
    })
  },
  [RATES_DELETE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      rateDel: {}
    })
  },
  [RATES_DELETE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [RATES_DELETE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      rateDel: action.payload.data
    })
  },
  [RECHARGE_MONTHCARD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {}
    })
  },
  [RECHARGE_MONTHCARD_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [RECHARGE_MONTHCARD_RECEIVE]: (state) => {
    return ({
      ...state,
      fetching: false
    })
  },
  [RECHARGE_KEEPING]: (state, action) => {
    return ({
      ...state,
      keeping: {
        ...state.keeping,
        ...action.payload
      }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  err: false,
  errMes: {},
  orders: [],
  export: {},
  repair: {},
  payment: {},
  remaps: [],
  groupList: [],
  rates: [],
  rateAdd: {},
  rateDel: {},
  keeping: {}
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
