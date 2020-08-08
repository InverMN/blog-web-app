import React from 'react'
import { ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import { Notification as NotificationData } from '../../../contexts/index'
import { Cancel as CancelIcon } from '@material-ui/icons'
import Moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

interface Props {
  data: NotificationData
  setChecked: () => void
  handleDelete: () => void
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
}) => {
  const classes = useStyles()

  const message = (() => {
    switch (subject) {
      case 'REPLIED_POST':
        return `${sender.username} replied your post`
      case 'REPLIED_COMMENT':
        return `${sender.username} replied your comment`
    }
  })()

  const { replyId, postId } = data
  const notificationLink = replyId && postId ? `/post/${postId}/${replyId}` : ''

  return (
    <Link to={notificationLink} style={{ textDecoration: 'none', color: 'black' }}>
      <ListItem button className={checked ? '' : classes.unchecked} onMouseEnter={setChecked}>
        <ListItemAvatar>
          <Avatar src={`http://localhost:5500/static/avatars/${sender.id}.png`} />
        </ListItemAvatar>
        <ListItemText primary={message} secondary={Moment(createdAt).fromNow()} />
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={handleDelete}>
            <CancelIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  )
}
