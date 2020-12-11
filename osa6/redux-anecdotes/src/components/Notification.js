import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notifyWith } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const setNotification = (notification) => {
    console.log('Notifying with', notification)
    dispatch(notifyWith(notification))
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification