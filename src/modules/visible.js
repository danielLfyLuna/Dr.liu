// ------------------------------------
// Constants
// ------------------------------------
const SHOW_VISIBLE = 'SHOW_VISIBLE'
const HIDE_VISIBLE = 'HIDE_VISIBLE'


// ------------------------------------
// Actions
// ------------------------------------
function showVisible() {
  return {type: SHOW_VISIBLE}
}
function hideVisible(data) {
  return {type: HIDE_VISIBLE}
}

export const actions = {
  showVisible,
  hideVisible
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_VISIBLE]: (state) => {
    return true
  },
  [HIDE_VISIBLE]: (state) => {
    return false
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = false
export default function visibleReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
