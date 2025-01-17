import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { Comment, CommentEditor } from './index'
import { Comment as CommentData } from '../../../contexts/index'
import { Post } from '../../../contexts/index'

interface Props {
  replies: CommentData[]
  showEditorTop: boolean
  handleCloseTop: () => void
  target: string
  post: Post
}

export const CommentsSection: React.FC<Props> = ({ replies, showEditorTop, handleCloseTop, target, post }) => {
  const renderComments = () => {
    return replies.map((commentData) => {
      return (
        <Grid style={{ flexGrow: 1 }} item key={commentData.id}>
          <Comment comment={commentData} post={post} />
        </Grid>
      )
    })
  }

  return (
    <Box m={1}>
      <Grid container spacing={1}>
        {showEditorTop ? (
          <Grid item style={{ flexGrow: 1 }}>
            <CommentEditor handleClose={handleCloseTop} target={target} />
          </Grid>
        ) : null}

        {renderComments()}
      </Grid>
    </Box>
  )
}
