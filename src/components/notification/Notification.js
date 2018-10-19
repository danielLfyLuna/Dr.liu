import React from 'react'
import { notification } from 'antd'

export const openNotificationWithIcon = (type, message, description, time) => {
  notification[type]({
    message: message ? `${message}` : '',
    description: description ? `${description}` : '',
    duration: time || 3
  })
}
