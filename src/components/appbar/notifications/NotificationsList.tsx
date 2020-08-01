import React from 'react'
import { Popover, List, ListSubheader } from '@material-ui/core'
import { NotificationsContext } from '../../../contexts/NotificationsContext'
import { NotificationItem } from './index'

interface Props {
  anchorElement: HTMLElement | null
  handleClose: () => void
}

export const NotificationsList: React.FC<Props> = ({ anchorElement, handleClose }) => {
  const { notifications, dispatch } = React.useContext(NotificationsContext)

  const generateNotificationItems = () =>
    notifications.map((notification) => <NotificationItem key={notification.id} data={notification} />)

  return (
    <Popover
      open={Boolean(anchorElement)}
      anchorEl={anchorElement}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handleClose}
    >
      <List subheader={<ListSubheader>Notifications</ListSubheader>}>{generateNotificationItems()}</List>
    </Popover>
  )
}
