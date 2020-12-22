const reducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default: return state
  }
}

let timerId
export const notifyWith = (notification, seconds) => {
  return async dispatch => {
    const time = seconds * 1000
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: ''
      })
    }, time)
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
  }
}

export default reducer