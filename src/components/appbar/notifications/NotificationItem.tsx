import React from 'react'
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core'
import { Notification as NotificationData } from '../../../contexts/index'
import Moment from 'moment'

interface Props {
  data: NotificationData
}

export const NotificationItem: React.FC<Props> = ({
  data: { id, sender, receiver, subject, data, checked, createdAt },
}) => {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar src={`http://localhost:5500/static/avatars/${id}.png`} />
      </ListItemAvatar>
      <ListItemText primary={data} secondary={Moment(createdAt).fromNow()} />
    </ListItem>
  )
}
