import React from 'react'
import { IconButton } from '@material-ui/core'
import { Notifications as NotificationsIcon } from '@material-ui/icons'

export const NotificationsButton: React.FC = () => {
  return (
    <IconButton aria-label="notifications">
      <NotificationsIcon />
    </IconButton>
  )
}
