import React, { useState, MouseEvent } from 'react'
import { Card, CardHeader, CardContent, CardActions, Typography, Avatar, IconButton } from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import Moment from 'moment'
import { PostData, PostMenu } from './index'
import { User } from '../../contexts/index'

interface Props {
  post: PostData
  user: User | null
}

export const Post: React.FC<Props> = ({ post, user }) => {
  const { author, id, createdAt, body } = post
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorElement(null)
  }

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
            <div>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <PostMenu handleClose={handleMenuClose} anchorElement={anchorElement} post={post} user={user} />
            </div>
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
