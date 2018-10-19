/* global API_HOST */
import axios from 'axios'

const LOCAL_RECEIVE = 'LOCAL_RECEIVE'
const LOCAL_ERR = 'LOCAL_ERR'

function localReceive(val) {
  return {
    type: LOCAL_RECEIVE,
    payload: val
  }
}

function localErr(val) {
  return {
    type: LOCAL_ERR,
    payload: val
  }
}

export function getLocal(value) {
  return async (dispatch) => {
    const ex = {
      'zh-CN': 1,
      'en-US': 3,
      'vi-VN': 5
    }
    let url = `${API_HOST}/locale/${ex[value.language]}`
    try {
      const resp = await axios({
        method: 'PUT',
        url: url,
        headers: {
          adminUserId: value.userId,
          Authorization: `bearer ${value.token}`
        }
      })  
      dispatch(localReceive(resp.data))
    } catch (error) {
      if (error.response) {
        dispatch(localErr(error.response.data))
      } else {
        console.log('Error', error.message)
      }
    }
  }
}

const ACTION_HANDLERS = {
  [LOCAL_RECEIVE]: (state, action) => {
    return ({
      ...state,
      language: action.payload
    })
  },
  [LOCAL_ERR]: (state, action) => {
    return ({
      ...state,
      error: action.payload
    })
  }
}

const initialState = {
  language: {},
  error: null
}

export default function localReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
