import React, { useState } from 'react'
import { Grid, Avatar, Paper, Typography, Box, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import { ReplyMenu, CommentEditor } from './index'
import { Subcomment as SubcommentData, UserContext, Post as PostData } from '../../../contexts/index'
import { Feedback } from '../Feedback'
import Moment from 'moment'
import { injectIframe } from '../../../lib/index'

const useStyles = makeStyles({
  mediumAvatar: {
    width: '30px',
    height: '30px',
  },
})

interface Props {
  subcomment: SubcommentData
  handleOpenEditor: () => void
  post: PostData
}

export const Subcomment: React.FC<Props> = ({ subcomment, handleOpenEditor, post }) => {
  const { body, author, createdAt, popularity, id, userReaction } = subcomment
  const [isEdited, setIsEdited] = useState(false)
  const classes = useStyles()
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const { user } = React.useContext(UserContext)

  const handleMenuClick = (event: any) => {
    setAnchorElement(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorElement(null)
  }

  const renderStaticComment = () => {
    return (
      <Paper variant="outlined" id={`reply-${subcomment.id}`}>
        <Box m={1}>
          <Grid container spacing={1} direction="row" style={{ flexWrap: 'nowrap' }}>
            <Grid item>
              <Avatar
                alt={author.username}
                src={`${window.serverURL}/static/avatars/${author.id}.png`}
                className={classes.mediumAvatar}
                style={{ marginTop: '8px' }}
              >
                {author.username}
              </Avatar>
            </Grid>
            <Grid item container direction="column">
              <Grid item container direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle1">{author.username}</Typography>
                </Grid>
                <Grid item style={{ flexGrow: 1 }}>
                  <Typography color="textSecondary" style={{ fontSize: '14px' }} variant="subtitle1">
                    {Moment(createdAt).fromNow()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Feedback popularity={popularity} userReaction={userReaction} target={id} size="small" />
                </Grid>
                <Grid item>
                  <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon style={{ fontSize: '20px' }} />
                  </IconButton>
                  <ReplyMenu
                    handleClose={handleMenuClose}
                    anchorElement={anchorElement}
                    comment={subcomment}
                    handleBodyEditor={() => setIsEdited(true)}
                    handleOpenEditor={handleOpenEditor}
                    post={post}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Box dangerouslySetInnerHTML={{ __html: injectIframe(body) }} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    )
  }

  return (
    <div>
      {isEdited ? (
        <CommentEditor
          target={subcomment.id}
          handleClose={() => setIsEdited(false)}
          editingExistingComment={true}
          existingCommentBody={subcomment.body}
        />
      ) : (
        renderStaticComment()
      )}
    </div>
  )
}
