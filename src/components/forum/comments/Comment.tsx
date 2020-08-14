import React, { useState } from 'react'
import { Grid, Avatar, Paper, Typography, Box, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import { ReplyMenu, SubcommentsSection, CommentEditor } from './index'
import { Comment as CommentData, UserContext } from '../../../contexts/index'
import { Feedback } from '../Feedback'
import { AuthenticatedOnly } from '../../common/AuthenticatedOnly'
import Moment from 'moment'

const useStyles = makeStyles({
  mediumAvatar: {
    width: '30px',
    height: '30px',
  },
})

interface Props {
  comment: CommentData
}

export const Comment: React.FC<Props> = ({ comment }) => {
  const { body, author, createdAt, popularity, id, replies, userReaction } = comment
  const [openCommentEditor, setOpenCommentEditor] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const classes = useStyles()
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const [openSubcommentEditor, setOpenSubcommentEditor] = useState(false)
  const { user } = React.useContext(UserContext)

  const handleMenuClick = (event: any) => {
    setAnchorElement(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorElement(null)
  }

  const handleOpenEditor = () => {
    setOpenCommentEditor(true)
  }

  const renderStaticComment = () => {
    return (
      <Paper variant="outlined" id={`reply-${comment.id}`}>
        <Box m={1}>
          <Grid container spacing={1} direction="row" style={{ flexWrap: 'nowrap' }}>
            <Grid item>
              <Avatar
                alt={author.username}
                src={`http://localhost:5500/static/avatars/${author.id}.png`}
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
                  <AuthenticatedOnly>
                    <IconButton disabled={user === null} onClick={handleMenuClick}>
                      <MoreVertIcon style={{ fontSize: '20px' }} />
                    </IconButton>
                    <ReplyMenu
                      handleClose={handleMenuClose}
                      anchorElement={anchorElement}
                      comment={comment}
                      handleBodyEditor={() => setIsEdited(true)}
                      handleOpenEditor={() => setOpenSubcommentEditor(true)}
                    />
                  </AuthenticatedOnly>
                </Grid>
              </Grid>
              <Grid item>
                <Box dangerouslySetInnerHTML={{ __html: body }} />
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
          target={comment.id}
          handleClose={() => setIsEdited(false)}
          editingExistingComment={true}
          existingCommentBody={comment.body}
        />
      ) : (
        renderStaticComment()
      )}
      {replies === [] ? null : (
        <div style={{ paddingLeft: '20px' }}>
          <SubcommentsSection
            subcomments={replies}
            target={id}
            handleOpenEditor={() => setOpenSubcommentEditor(true)}
            handleCloseEditor={() => setOpenSubcommentEditor(false)}
            openEditor={openSubcommentEditor}
          />
        </div>
      )}
    </div>
  )
}
