import React from 'react'
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core'
import { Notification as NotificationData } from '../../../contexts/index'
import Moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  data: NotificationData
}

const useStyles = makeStyles({
  unchecked: {
    backgroundColor: 'rgba(2, 119, 189, 0.25)',
  },
})

export const NotificationItem: React.FC<Props> = ({
  data: { id, sender, receiver, subject, data, checked, createdAt },
}) => {
  const classes = useStyles()

  let message
  switch (subject) {
    case 'REPLIED_POST':
      message = `${sender.username} replied your post`
    case 'REPLIED_COMMENT':
      message = `${sender.username} replied your comment`
  }

  return (
    <ListItem button className={checked ? '' : classes.unchecked}>
      <ListItemAvatar>
        <Avatar src={`http://localhost:5500/static/avatars/${sender.id}.png`} />
      </ListItemAvatar>
      <ListItemText primary={message} secondary={Moment(createdAt).fromNow()} />
    </ListItem>
  )
}
