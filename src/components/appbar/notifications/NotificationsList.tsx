import React from 'react'
import { Popover, List } from '@material-ui/core'
import { NotificationsContext } from '../../../contexts/NotificationsContext'
import { NotificationsListTopBar, NotificationItem } from './index'
import { useAPI } from '../../../lib/API'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  anchorElement: HTMLElement | null
  handleClose: () => void
}

const useStyles = makeStyles({
  list: {
    minWidth: '375px',
  },
})

export const NotificationsList: React.FC<Props> = ({ anchorElement, handleClose }) => {
  const { notifications, dispatch } = React.useContext(NotificationsContext)
  const api = useAPI()
  const classes = useStyles()

  const generateNotificationItems = () =>
    notifications.map((notification) => (
      <NotificationItem
        key={notification.id}
        data={notification}
        setChecked={() => {
          if (notification.checked === false) {
            api.patch(`notifications/${notification.id}`)
            dispatch({ type: 'CHECKOUT_NOTIFICATION', payload: { id: notification.id } })
          }
        }}
        handleDelete={() => {
          api.delete(`notifications/${notification.id}`)
          dispatch({ type: 'DELETE_NOTIFICATION', payload: { id: notification.id } })
        }}
      />
    ))

  const clearAllNotifications = () => {
    api.delete('notifications')
    dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' })
  }

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
      <List className={classes.list} subheader={<NotificationsListTopBar clearAll={clearAllNotifications} />}>
        {generateNotificationItems()}
      </List>
    </Popover>
  )
}
