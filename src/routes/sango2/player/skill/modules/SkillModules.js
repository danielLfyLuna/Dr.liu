/* global SANGO2_API_HOST */
import axios from 'axios'
import _ from 'lodash'

import openNotificationWithIcon from '../../../../../components/notification'
import {singOut} from '../../../../../modules/login'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_SKILL = 'REQUEST_SKILL'
const RECEIVE_SKILL = 'RECEIVE_SKILL'

const REQUEST_SEND_SKILL = 'REQUEST_SEND_SKILL'
const RECEIVE_SEND_SKILL = 'RECEIVE_SEND_SKILL'

const KEEPING_SKILL = 'KEEPING_SKILL'

// ------------------------------------
// Actions
// ------------------------------------
function requestSkill () {
  return {
    type: REQUEST_SKILL
  }
}
function receiveSkill (list) {
  let equip = []
  let backpack = []
  _.forEach(list, function(value, index, collection) {
    if (value.equiped) {
      equip.push(value)
    } else {
      backpack.push(value)
    }
  })
  return {
    type: RECEIVE_SKILL,
    data: {
      equip,
      backpack
    }

  }
}
function requestSendSkill () {
  return {
    type: REQUEST_SEND_SKILL
  }
}
function receiveSendSkill () {
  return {
    type: RECEIVE_SEND_SKILL
  }
}
function keepSkill(data) {
  return {
    type: KEEPING_SKILL,
    payload: data
  }
}

function fetchSkill(value) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', value)

    dispatch(requestSkill())
    let url = `${SANGO2_API_HOST}/products/${value.products[0]}/servers/${value.products[1]}/players/skills`
    axios({
      method: 'get',
      url: url,
      // data: {
      //   ID: 12345
      // },
      params: {
        nickname: value.nickname,
        playerId: value.playerId
      },
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      dispatch(receiveSkill(data.data.domainObject))
      // openNotificationWithIcon('success', data.data.msg)
    }).catch(error => {
      if (error.response) {
        if (error.response.data.message === 'token异常，请重新登录。') {
          openNotificationWithIcon('warning', '登录过期', error.response.data.message, 3)
          dispatch(singOut())
        } else {
          openNotificationWithIcon('warning', '失败', error.response.data.tips, 3)
        }
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}
function sendSkill(value) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', value)

    const { products, nickname, skillId } = value

    dispatch(requestSendSkill())
    let url = `${SANGO2_API_HOST}/products/${products[0]}/mails/servers/${products[1]}/sendskill`
    axios({
      method: 'post',
      url: url,
      data: {
        nickname,
        skillId: skillId[0]
      },
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(data => {
      dispatch(receiveSendSkill())
      openNotificationWithIcon('success', data.data.msg)
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
  fetchSkill,
  sendSkill,
  keepSkill
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_SKILL]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_SKILL]: (state, action) => {
    return ({
      ...state,
      list: Object.assign({}, action.data),
      fetching: false
    })
  },
  [REQUEST_SEND_SKILL]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_SEND_SKILL]: (state) => {
    return ({
      ...state,
      fetching: false
    })
  },
  [KEEPING_SKILL]: (state, action) => {
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
  list: {},
  keeping: {}
}
export default function mailsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
