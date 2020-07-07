import React from 'react'
import { Card, CardHeader, CardContent, CardActions, Typography, Avatar, IconButton } from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'

interface Props {
  id: string
  author: {
    id: string
    username: string
  }
  createdAt: number
  body: string
}

export const Post: React.FC<Props> = ({ author, createdAt, body }) => {
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
          subheader={createdAt}
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
