/* global SANGO2_API_HOST */
/* global API_HOST */
import axios from 'axios'
import _ from 'lodash'
import openNotificationWithIcon from '../../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const USERS_REQUEST = 'USERS_REQUEST'
const USERS_RECEIVE = 'USERS_RECEIVE'

const GAMESALE_MANAGERS_REQUEST = 'GAMESALE_MANAGERS_REQUEST'
const GAMESALE_MANAGERS_REQUEST_ERR = 'GAMESALE_MANAGERS_REQUEST_ERR'
const GAMESALE_MANAGERS_RECEIVE = 'GAMESALE_MANAGERS_RECEIVE'
const GAMESALE_MANAGERS_CLEAR = 'GAMESALE_MANAGERS_CLEAR'

const GAMESALE_MANAGER_PLAYER_REQUEST = 'GAMESALE_MANAGER_PLAYER_REQUEST'
const GAMESALE_MANAGER_PLAYER_REQUEST_ERR = 'GAMESALE_MANAGER_PLAYER_REQUEST_ERR'
const GAMESALE_MANAGER_PLAYER_RECEIVE = 'GAMESALE_MANAGER_PLAYER_RECEIVE'

const GAMESALE_MANAGER_CREATE_REQUEST = 'GAMESALE_MANAGER_CREATE_REQUEST'
const GAMESALE_MANAGER_CREATE_REQUEST_ERR = 'GAMESALE_MANAGER_CREATE_REQUEST_ERR'
const GAMESALE_MANAGER_CREATE_RECEIVE = 'GAMESALE_MANAGER_CREATE_RECEIVE'

const GAMESALE_MANAGER_UPDATE_REQUEST = 'GAMESALE_MANAGER_UPDATE_REQUEST'
const GAMESALE_MANAGER_UPDATE_REQUEST_ERR = 'GAMESALE_MANAGER_UPDATE_REQUEST_ERR'
const GAMESALE_MANAGER_UPDATE_RECEIVE = 'GAMESALE_MANAGER_UPDATE_RECEIVE'

const GAMESALE_MANAGER_DELETE_REQUEST = 'GAMESALE_MANAGER_DELETE_REQUEST'
const GAMESALE_MANAGER_DELETE_REQUEST_ERR = 'GAMESALE_MANAGER_DELETE_REQUEST_ERR'
const GAMESALE_MANAGER_DELETE_RECEIVE = 'GAMESALE_MANAGER_DELETE_RECEIVE'

const GAMESALE_PLAYERS_REQUEST = 'GAMESALE_PLAYERS_REQUEST'
const GAMESALE_PLAYERS_REQUEST_ERR = 'GAMESALE_PLAYERS_REQUEST_ERR'
const GAMESALE_PLAYERS_RECEIVE = 'GAMESALE_PLAYERS_RECEIVE'
const GAMESALE_PLAYERS_CLEAR = 'GAMESALE_PLAYERS_CLEAR'

const GAMESALE_PLAYER_UPDATE_REQUEST = 'GAMESALE_PLAYER_UPDATE_REQUEST'
const GAMESALE_PLAYER_UPDATE_REQUEST_ERR = 'GAMESALE_PLAYER_UPDATE_REQUEST_ERR'
const GAMESALE_PLAYER_UPDATE_RECEIVE = 'GAMESALE_PLAYER_UPDATE_RECEIVE'

const GAMESALE_PLAYER_JOINTYPE_REQUEST = 'GAMESALE_PLAYER_JOINTYPE_REQUEST'
const GAMESALE_PLAYER_JOINTYPE_REQUEST_ERR = 'GAMESALE_PLAYER_JOINTYPE_REQUEST_ERR'
const GAMESALE_PLAYER_JOINTYPE_RECEIVE = 'GAMESALE_PLAYER_JOINTYPE_RECEIVE'

const GAMESALE_ORDERS_REQUEST = 'GAMESALE_ORDERS_REQUEST'
const GAMESALE_ORDERS_REQUEST_ERR = 'GAMESALE_ORDERS_REQUEST_ERR'
const GAMESALE_ORDERS_RECEIVE = 'GAMESALE_ORDERS_RECEIVE'

const GAMESALE_ORDERS_TAKE_REQUEST = 'GAMESALE_ORDERS_TAKE_REQUEST'
const GAMESALE_ORDERS_TAKE_REQUEST_ERR = 'GAMESALE_ORDERS_TAKE_REQUEST_ERR'
const GAMESALE_ORDERS_TAKE_RECEIVE = 'GAMESALE_ORDERS_TAKE_RECEIVE'

const GAMESALE_ORDER_TAKE_REQUEST = 'GAMESALE_ORDER_TAKE_REQUEST'
const GAMESALE_ORDER_TAKE_REQUEST_ERR = 'GAMESALE_ORDER_TAKE_REQUEST_ERR'
const GAMESALE_ORDER_TAKE_RECEIVE = 'GAMESALE_ORDER_TAKE_RECEIVE'

const GAMESALE_APPROVES_REQUEST = 'GAMESALE_APPROVES_REQUEST'
const GAMESALE_APPROVES_REQUEST_ERR = 'GAMESALE_APPROVES_REQUEST_ERR'
const GAMESALE_APPROVES_RECEIVE = 'GAMESALE_APPROVES_RECEIVE'

const GAMESALE_APPROVE_ORDER_REQUEST = 'GAMESALE_APPROVE_ORDER_REQUEST'
const GAMESALE_APPROVE_ORDER_REQUEST_ERR = 'GAMESALE_APPROVE_ORDER_REQUEST_ERR'
const GAMESALE_APPROVE_ORDER_RECEIVE = 'GAMESALE_APPROVE_ORDER_RECEIVE'

const GAMESALE_KEEPING = 'GAMESALE_KEEPING'

// ------------------------------------
// Actions
// ------------------------------------

function requestUsers() {
  return {
    type: USERS_REQUEST
  }
}

function receiveUsers(data) {
  return {
    type: USERS_RECEIVE,
    payload: data
  }
}

function requestManagers() {
  return {
    type: GAMESALE_MANAGERS_REQUEST
  }
}

function requestManagersErr(data) {
  return {
    type: GAMESALE_MANAGERS_REQUEST_ERR,
    payload: data
  }
}

function receiveManagers(data) {
  return {
    type: GAMESALE_MANAGERS_RECEIVE,
    payload: data
  }
}

function clearManagers() {
  return {
    type: GAMESALE_MANAGERS_CLEAR
  }
}

function requestManagerPlayer() {
  return {
    type: GAMESALE_MANAGER_PLAYER_REQUEST
  }
}

function requestManagerPlayerErr(data) {
  return {
    type: GAMESALE_MANAGER_PLAYER_REQUEST_ERR,
    payload: data
  }
}

function receiveManagerPlayer(data) {
  return {
    type: GAMESALE_MANAGER_PLAYER_RECEIVE,
    payload: data
  }
}

function requestManagerCreate() {
  return {
    type: GAMESALE_MANAGER_CREATE_REQUEST
  }
}

function requestManagerCreateErr(data) {
  return {
    type: GAMESALE_MANAGER_CREATE_REQUEST_ERR,
    payload: data
  }
}

function receiveManagerCreate(data) {
  return {
    type: GAMESALE_MANAGER_CREATE_RECEIVE,
    payload: data
  }
}

function requestManagerModify() {
  return {
    type: GAMESALE_MANAGER_UPDATE_REQUEST
  }
}

function requestManagerModifyErr(data) {
  return {
    type: GAMESALE_MANAGER_UPDATE_REQUEST_ERR,
    payload: data
  }
}

function receiveManagerModify(data) {
  return {
    type: GAMESALE_MANAGER_UPDATE_RECEIVE,
    payload: data
  }
}

function requestManagerDelete() {
  return {
    type: GAMESALE_MANAGER_DELETE_REQUEST
  }
}

function requestManagerDeleteErr(data) {
  return {
    type: GAMESALE_MANAGER_DELETE_REQUEST_ERR,
    payload: data
  }
}

function receiveManagerDelete(data) {
  return {
    type: GAMESALE_MANAGER_DELETE_RECEIVE,
    payload: data
  }
}

function requestPlayers() {
  return {
    type: GAMESALE_PLAYERS_REQUEST
  }
}

function requestPlayersErr(data) {
  return {
    type: GAMESALE_PLAYERS_REQUEST_ERR,
    payload: data
  }
}

function receivePlayers(data) {
  return {
    type: GAMESALE_PLAYERS_RECEIVE,
    payload: data
  }
}

function clearPlayers() {
  return {
    type: GAMESALE_PLAYERS_CLEAR
  }
}

function requestPlayerModify() {
  return {
    type: GAMESALE_PLAYER_UPDATE_REQUEST
  }
}

function requestPlayerModifyErr(data) {
  return {
    type: GAMESALE_PLAYER_UPDATE_REQUEST_ERR,
    payload: data
  }
}

function receivePlayerModify(data) {
  return {
    type: GAMESALE_PLAYER_UPDATE_RECEIVE,
    payload: data
  }
}

function requestJoinTypes() {
  return {
    type: GAMESALE_PLAYER_JOINTYPE_REQUEST
  }
}

function requestJoinTypesErr(data) {
  return {
    type: GAMESALE_PLAYER_JOINTYPE_REQUEST_ERR,
    payload: data
  }
}

function receiveJoinTypes(data) {
  return {
    type: GAMESALE_PLAYER_JOINTYPE_RECEIVE,
    payload: data
  }
}

function requestOrders() {
  return {
    type: GAMESALE_ORDERS_REQUEST
  }
}

function requestOrdersErr(data) {
  return {
    type: GAMESALE_ORDERS_REQUEST_ERR,
    payload: data
  }
}

function receiveOrders(data) {
  return {
    type: GAMESALE_ORDERS_RECEIVE,
    payload: data
  }
}

function requestOrdersTake() {
  return {
    type: GAMESALE_ORDERS_TAKE_REQUEST
  }
}

function requestOrdersTakeErr(data) {
  return {
    type: GAMESALE_ORDERS_TAKE_REQUEST_ERR,
    payload: data
  }
}

function receiveOrdersTake(data) {
  return {
    type: GAMESALE_ORDERS_TAKE_RECEIVE,
    payload: data
  }
}

function requestOrderTake() {
  return {
    type: GAMESALE_ORDER_TAKE_REQUEST
  }
}

function requestOrderTakeErr(data) {
  return {
    type: GAMESALE_ORDER_TAKE_REQUEST_ERR,
    payload: data
  }
}

function receiveOrderTake(data) {
  return {
    type: GAMESALE_ORDER_TAKE_RECEIVE,
    payload: data
  }
}

function requestApproves() {
  return {
    type: GAMESALE_APPROVES_REQUEST
  }
}

function requestApprovesErr(data) {
  return {
    type: GAMESALE_APPROVES_REQUEST_ERR,
    payload: data
  }
}

function receiveApproves(data) {
  return {
    type: GAMESALE_APPROVES_RECEIVE,
    payload: data
  }
}

function requestApproveOrder() {
  return {
    type: GAMESALE_APPROVE_ORDER_REQUEST
  }
}

function requestApproveOrderErr(data) {
  return {
    type: GAMESALE_APPROVE_ORDER_REQUEST_ERR,
    payload: data
  }
}

function receiveApproveOrder(data) {
  return {
    type: GAMESALE_APPROVE_ORDER_RECEIVE,
    payload: data
  }
}

function keepGameSale(data) {
  return {
    type: GAMESALE_KEEPING,
    payload: data
  }
}

function fetchUsers() {
  return (dispatch) => {

    dispatch(requestUsers())
    let url = `${API_HOST}/userRoles/users`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveUsers(response))
    }).catch(error => {
      if (error.response) {
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchGameSaleManagers() {
  return (dispatch) => {

    dispatch(requestManagers())
    let url = `${SANGO2_API_HOST}/gamesalemanager`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveManagers(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestManagersErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function createGameSaleManager(data) {
  return (dispatch) => {

    dispatch(requestManagerCreate())
    let url = `${SANGO2_API_HOST}/gamesalemanager`
    return axios({
      method: 'POST',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveManagerCreate(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestManagerCreateErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateGameSaleManager(data) {
  return (dispatch) => {

    dispatch(requestManagerModify())
    let url = `${SANGO2_API_HOST}/gamesalemanager/${data.path.managerId}`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveManagerModify(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestManagerModifyErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function deleteGameSaleManager(data) {
  return (dispatch) => {

    dispatch(requestManagerDelete())
    let url = `${SANGO2_API_HOST}/gamesalemanager/${data.path.managerId}`
    axios({
      method: 'DELETE',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveManagerDelete(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestManagerDeleteErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchGameSalePlayers(data) {
  return (dispatch) => {

    dispatch(requestPlayers())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/gamesales/vipPlayers`
    axios({
      method: 'GET',
      params: data.params,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receivePlayers(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestPlayersErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchManagerPlayer(data) {
  return (dispatch) => {

    dispatch(requestManagerPlayer())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/gamesales/managers/${data.path.managerId}`
    return axios({
      method: 'GET',
      params: data.params,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveManagerPlayer(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestManagerPlayerErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateGameSalePlayer(data) {
  return (dispatch) => {

    dispatch(requestPlayerModify())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/gamesales/vipPlayers/${data.path.playerId}`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receivePlayerModify(response))
      openNotificationWithIcon('success', '更新操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestPlayerModifyErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchGameSaleJoinTypes(data) {
  return (dispatch) => {

    dispatch(requestJoinTypes())
    let url = `${SANGO2_API_HOST}/gamesalemanager/types/${data.path.type}`
    axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveJoinTypes(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestJoinTypesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchGameSaleOrders(data) {
  return (dispatch) => {

    dispatch(requestOrders())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/gamesales/vipPlayerOrders`
    axios({
      method: 'GET',
      params: data.params,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveOrders(response))
      openNotificationWithIcon('success', '拉取列表操作完成！')
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

function takeGameSaleOrders(data) {
  return (dispatch) => {

    dispatch(requestOrdersTake())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/gamesales/takeOrders`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveOrdersTake(response))
      openNotificationWithIcon('success', '多个提单操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestOrdersTakeErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function takeGameSaleOrder(data) {
  return (dispatch) => {

    dispatch(requestOrderTake())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/gamesales/takeOrder/${data.path.orderId}`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveOrderTake(response))
      openNotificationWithIcon('success', '提单操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestOrderTakeErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchGameSaleApproves(data) {
  return (dispatch) => {

    dispatch(requestApproves())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/gamesales/approveOrders`
    axios({
      method: 'GET',
      params: data.params,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveApproves(response))
      openNotificationWithIcon('success', '拉取列表操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestApprovesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function approveGameSaleOrder(data) {
  return (dispatch) => {

    dispatch(requestApproveOrder())
    let url = `${SANGO2_API_HOST}/products/${data.path.productId}/servers/${data.path.serverId}/gamesales/approveOrder`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveApproveOrder(response))
      openNotificationWithIcon('success', '提单审核操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestApproveOrderErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchGameSaleManagers,
  clearManagers,
  fetchManagerPlayer,
  createGameSaleManager,
  updateGameSaleManager,
  deleteGameSaleManager,
  fetchGameSalePlayers,
  clearPlayers,
  updateGameSalePlayer,
  fetchGameSaleJoinTypes,
  fetchGameSaleOrders,
  takeGameSaleOrders,
  takeGameSaleOrder,
  fetchGameSaleApproves,
  approveGameSaleOrder,
  keepGameSale,
  fetchUsers
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USERS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      users: []
    })
  },
  [USERS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      users: action.payload.data.userList || []
    })
  },
  [GAMESALE_MANAGERS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      managers: []
    })
  },
  [GAMESALE_MANAGERS_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.response.data.tips }
    })
  },
  [GAMESALE_MANAGERS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      managers: action.payload.data.domainObject || []
    })
  },
  [GAMESALE_MANAGERS_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      managers: []
    })
  },
  [GAMESALE_MANAGER_PLAYER_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      player: []
    })
  },
  [GAMESALE_MANAGER_PLAYER_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.response.data.tips }
    })
  },
  [GAMESALE_MANAGER_PLAYER_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      player: action.payload.data.domainObject || []
    })
  },
  [GAMESALE_MANAGER_CREATE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      newManager: []
    })
  },
  [GAMESALE_MANAGER_CREATE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [GAMESALE_MANAGER_CREATE_RECEIVE]: (state, action) => {
    const manager = action.payload.data.domainObject
    return ({
      ...state,
      fetching: false,
      managers: [...manager],
      newManager: manager
    })
  },
  [GAMESALE_MANAGER_UPDATE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      managerMod: {}
    })
  },
  [GAMESALE_MANAGER_UPDATE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [GAMESALE_MANAGER_UPDATE_RECEIVE]: (state, action) => {
    const managers = [...state.managers]
    const manager = action.payload.data.domainObject
    _.map(managers, (val, index) => {
      if (manager.id && val.id === manager.id) {
        Object.assign(val, manager)
      }
    })
    return ({
      ...state,
      fetching: false,
      managers: [...managers],
      managerMod: manager
    })
  },
  [GAMESALE_MANAGER_DELETE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      managerDel: {}
    })
  },
  [GAMESALE_MANAGER_DELETE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [GAMESALE_MANAGER_DELETE_RECEIVE]: (state, action) => {
    const manager = action.payload.data.domainObject
    const managers = state.managers.filter((option, index) => {
      return option.id !== manager.id
    })
    return ({
      ...state,
      fetching: false,
      managers: managers,
      managerDel: manager
    })
  },
  [GAMESALE_PLAYERS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      players: []
    })
  },
  [GAMESALE_PLAYERS_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [GAMESALE_PLAYERS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      players: action.payload.data.domainObject || []
    })
  },
  [GAMESALE_PLAYERS_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      players: []
    })
  },
  [GAMESALE_PLAYER_UPDATE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      playerMod: {}
    })
  },
  [GAMESALE_PLAYER_UPDATE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [GAMESALE_PLAYER_UPDATE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      playerMod: action.payload.data
    })
  },
  [GAMESALE_PLAYER_JOINTYPE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      joinTypes: []
    })
  },
  [GAMESALE_PLAYER_JOINTYPE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [GAMESALE_PLAYER_JOINTYPE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      joinTypes: action.payload.data.domainObject || []
    })
  },
  [GAMESALE_ORDERS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      orders: []
    })
  },
  [GAMESALE_ORDERS_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [GAMESALE_ORDERS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      orders: action.payload.data.domainObject || []
    })
  },
  [GAMESALE_ORDERS_TAKE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      ordersTake: []
    })
  },
  [GAMESALE_ORDERS_TAKE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [GAMESALE_ORDERS_TAKE_RECEIVE]: (state, action) => {
    const orders = [...state.orders]
    const order = action.payload.data.domainObject
    _.map(orders, (value, index) => {
      if (order.length) {
        _.map(order, (val, idx) => {
          if (value.orderId === val.orderId) {
            Object.assign(value, val)
          }
        })
      }
    })
    return ({
      ...state,
      fetching: false,
      orders: [...orders],
      ordersTake: [...order]
    })
  },
  [GAMESALE_ORDER_TAKE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      orderTake: {}
    })
  },
  [GAMESALE_ORDER_TAKE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [GAMESALE_ORDER_TAKE_RECEIVE]: (state, action) => {
    const orders = [...state.orders]
    const order = action.payload.data.domainObject
    _.map(orders, (val, index) => {
      if (order.orderId && val.orderId === order.orderId) {
        Object.assign(val, order)
      }
    })
    return ({
      ...state,
      fetching: false,
      orders: [...orders],
      orderTake: order
    })
  },
  [GAMESALE_APPROVES_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      approves: []
    })
  },
  [GAMESALE_APPROVES_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [GAMESALE_APPROVES_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      approves: action.payload.data.domainObject || []
    })
  },
  [GAMESALE_APPROVE_ORDER_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      approve: {}
    })
  },
  [GAMESALE_APPROVE_ORDER_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [GAMESALE_APPROVE_ORDER_RECEIVE]: (state, action) => {
    const approves = [...state.approves]
    const approve = action.payload.data.domainObject
    _.map(approves, (value, index) => {
      if (approve.orderId && value.orderId === approve.orderId) {
        Object.assign(value, approve)
      }
    })
    return ({
      ...state,
      fetching: false,
      approves: [...approves],
      approve: approve
    })
  },
  [GAMESALE_KEEPING]: (state, action) => {
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
  managers: [],
  player: [],
  newManager: [],
  managerMod: {},
  managerDel: {},
  players: [],
  playerMod: {},
  joinTypes: [],
  orders: [],
  ordersTake: [],
  orderTake: {},
  approves: [],
  approve: {},
  keeping: {},
  users: []
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
