import React from 'react'
import { ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import { Notification as NotificationData } from '../../../contexts/index'
import { Cancel as CancelIcon } from '@material-ui/icons'
import Moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

interface Props {
  data: NotificationData
  setChecked: () => void
  handleDelete: () => void
  handleNotificationsListClose: () => void
}

const useStyles = makeStyles({
  unchecked: {
    backgroundColor: 'rgba(2, 119, 189, 0.25)',
  },
})

export const NotificationItem: React.FC<Props> = ({
  data: { id, sender, receiver, subject, data, checked, createdAt },
  setChecked,
  handleDelete,
  handleNotificationsListClose,
}) => {
  const classes = useStyles()
  const history = useHistory()

  const message = (() => {
    switch (subject) {
      case 'REPLIED_POST':
        return `${sender.username} replied your post`
      case 'REPLIED_COMMENT':
        return `${sender.username} replied your comment`
      case 'MENTIONED':
        return `${sender.username} mentioned you`
    }
  })()

  const { replyId, postId } = data
  const notificationLink = replyId ? `/post/${postId}/${replyId}` : `/post/${postId}`

  const handleClick = () => {
    handleNotificationsListClose()
    history.push(notificationLink)
  }

  return (
    <ListItem button className={checked ? '' : classes.unchecked} onMouseEnter={setChecked} onClick={handleClick}>
      <ListItemAvatar>
        <Avatar src={`${window.serverURL}/static/avatars/${sender.id}.png`} />
      </ListItemAvatar>
      <ListItemText primary={message} secondary={Moment(createdAt).fromNow()} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleDelete}>
          <CancelIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
