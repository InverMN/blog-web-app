import React, { useState, MouseEvent } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  IconButton,
  Grid,
  Button,
} from '@material-ui/core'
import { MoreVert as MoreVertIcon, Reply as ReplyIcon, Share as ShareIcon } from '@material-ui/icons'
import Moment from 'moment'
import { PostMenu, Feedback } from './index'
import { CommentsSection } from './comments/index'
import { User, Post as PostData } from '../../contexts/index'
import { AuthenticatedOnly } from '../common/AuthenticatedOnly'

interface Props {
  post: PostData
  user: User | null
}

export const Post: React.FC<Props> = ({ post, user }) => {
  const { author, id, createdAt, body, editedAt, popularity, userReaction, replies } = post
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const [openCommentEditor, setOpenCommentEditor] = useState(false)

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
            <AuthenticatedOnly>
              <IconButton disabled={user === null} aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              {anchorElement && (
                <PostMenu handleClose={handleMenuClose} anchorElement={anchorElement} post={post} user={user} />
              )}
            </AuthenticatedOnly>
          }
        />
        <CardContent dangerouslySetInnerHTML={{ __html: body }} />
        <CardActions>
          <Grid container justify="space-around">
            <Grid item>
              <Button style={{ color: '#999', margin: '4px 0' }} startIcon={<ShareIcon />}>
                Share
              </Button>
            </Grid>
            <Grid item>
              <AuthenticatedOnly>
                <Button
                  disabled={user === null || openCommentEditor}
                  onClick={() => setOpenCommentEditor(true)}
                  style={{ color: '#999', margin: '4px 0' }}
                  startIcon={<ReplyIcon />}
                >
                  Reply
                </Button>
              </AuthenticatedOnly>
            </Grid>
            <Grid item>
              <Feedback popularity={popularity} target={id} userReaction={userReaction} />
            </Grid>
          </Grid>
        </CardActions>
        <CommentsSection
          replies={replies}
          showEditorTop={openCommentEditor}
          target={id}
          handleCloseTop={() => setOpenCommentEditor(false)}
        />
      </Card>
    </div>
  )
}
