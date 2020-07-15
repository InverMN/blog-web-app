import React from 'react'
import { Card, CardHeader, CardContent, CardActions, Typography, Avatar, IconButton } from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import Moment from 'moment'
import { PostData } from './index'

export const Post: React.FC<PostData> = (postData) => {
  const { author, id, createdAt, body } = postData

  return (
    <div>
      <Card variant="outlined">
        <CardHeader
          avatar={
            <Avatar alt={author.username} src={`http://localhost:5500/static/avatars/${author.id}.png`}>
              {author.username}
            </Avatar>
          }
          title={author.username}
          subheader={Moment(createdAt).fromNow()}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography>{body}</Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  )
}
