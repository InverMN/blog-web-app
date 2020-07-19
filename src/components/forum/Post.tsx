import React, { useState, MouseEvent } from 'react'
import { Card, CardHeader, CardContent, CardActions, Typography, Avatar, IconButton } from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import Moment from 'moment'
import { PostMenu, Feedback, CommentsSection } from './index'
import { User, Post as PostData } from '../../contexts/index'

interface Props {
  post: PostData
  user: User | null
}

export const Post: React.FC<Props> = ({ post, user }) => {
  const { author, id, createdAt, body, editedAt, popularity, userReaction, replies } = post
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
          subheader={
            <div>
              <Typography>
                {Moment(createdAt).fromNow()}{' '}
                {editedAt !== undefined ? (
                  <Typography variant="subtitle2">edited {Moment(editedAt).fromNow()}</Typography>
                ) : null}
              </Typography>
            </div>
          }
          action={
            <div>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <PostMenu handleClose={handleMenuClose} anchorElement={anchorElement} post={post} user={user} />
            </div>
          }
        />
        <CardContent dangerouslySetInnerHTML={{ __html: body }} />
        <CardActions>
          <Feedback popularity={popularity} target={id} userReaction={userReaction} />
        </CardActions>
        <CommentsSection replies={replies} />
      </Card>
    </div>
  )
}
