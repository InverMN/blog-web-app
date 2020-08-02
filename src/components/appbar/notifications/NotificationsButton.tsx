import React from 'react'
import { IconButton, Badge } from '@material-ui/core'
import { Notifications as NotificationsIcon } from '@material-ui/icons'
import { NotificationsList } from './NotificationsList'
import { NotificationsContext, Notification } from '../../../contexts/NotificationsContext'

export const NotificationsButton: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null)
  const [uncheckedNotificationsCount, setUncheckedNotificationsCount] = React.useState(0)
  const { notifications } = React.useContext(NotificationsContext)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => setAnchorElement(null)

  React.useEffect(() => {
    let counter = 0

    notifications.forEach((singleNotification) => {
      if (singleNotification.checked === false) counter++
    })

    setUncheckedNotificationsCount(counter)
  }, [notifications])

  return (
    <div>
      <IconButton aria-label="notifications" onClick={handleOpen}>
        <Badge
          badgeContent={uncheckedNotificationsCount}
          invisible={uncheckedNotificationsCount === 0}
          color="error"
          max={99}
        >
          <NotificationsIcon style={{ color: 'white' }} />
        </Badge>
      </IconButton>
      <NotificationsList anchorElement={anchorElement} handleClose={handleClose} />
    </div>
  )
}
