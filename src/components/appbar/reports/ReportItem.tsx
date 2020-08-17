import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core'
import { Report as ReportData } from '../../../contexts/index'
import { Cancel as CancelIcon } from '@material-ui/icons'
import Moment from 'moment'
import { useHistory } from 'react-router-dom'

interface Props {
  data: ReportData
  handleDelete: () => void
  handleReportsListClose: () => void
}

export const ReportItem: React.FC<Props> = ({
  data: { id, target, data, checked, createdAt, times },
  handleDelete,
  handleReportsListClose,
}) => {
  const history = useHistory()

  const { replyId, postId } = data
  const notificationLink = replyId && postId ? `/post/${postId}/${replyId}` : ''

  const handleClick = () => {
    handleReportsListClose()
    history.push(notificationLink)
  }

  return (
    <ListItem button onClick={handleClick}>
      <Typography variant="h4" color="error" style={{ minWidth: 50, textAlign: 'center', marginRight: '8px' }}>
        {times}
      </Typography>
      <ListItemText primary={'Content has been reported'} secondary={Moment(createdAt).fromNow()} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleDelete}>
          <CancelIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
