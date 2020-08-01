import React from 'react'
import { IconButton } from '@material-ui/core'
import { Notifications as NotificationsIcon } from '@material-ui/icons'
import { NotificationsList } from './NotificationsList'

export const NotificationsButton: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => setAnchorElement(null)

  return (
    <div>
      <IconButton aria-label="notifications" onClick={handleOpen}>
        <NotificationsIcon style={{ color: 'white' }} />
      </IconButton>
      <NotificationsList anchorElement={anchorElement} handleClose={handleClose} />
    </div>
  )
}
