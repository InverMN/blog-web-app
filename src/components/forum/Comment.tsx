import React, { useState } from 'react'
import { Grid, Avatar, Paper, Typography, Box, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import { Feedback, CommentsSection, CommentMenu } from './index'
import { Comment as CommentData } from '../../contexts/index'
import Moment from 'moment'

const useStyles = makeStyles({
  mediumAvatar: {
    width: '30px',
    height: '30px',
  },
})

export const Comment: React.FC<CommentData> = (comment) => {
  const { body, author, createdAt, popularity, id, replies, userReaction } = comment
  const classes = useStyles()
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const [openCommentEditor, setOpenCommentEditor] = useState(false)

  const handleMenuClick = (event: any) => {
    setAnchorElement(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorElement(null)
  }

  return (
    <div>
      <Paper variant="outlined">
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
                  <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon color="action" style={{ fontSize: '20px' }} />
                  </IconButton>
                  <CommentMenu handleClose={handleMenuClose} anchorElement={anchorElement} comment={comment} />
                </Grid>
              </Grid>
              <Grid item>
                <Box dangerouslySetInnerHTML={{ __html: body }} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {replies === [] ? null : (
        <div style={{ paddingLeft: '20px' }}>
          <CommentsSection indent replies={replies} />
        </div>
      )}
    </div>
  )
}
