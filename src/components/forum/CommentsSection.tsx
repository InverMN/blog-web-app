import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { Comment } from './index'
import { Comment as CommentData } from '../../contexts/index'

interface Props {
  replies: CommentData[]
}

export const CommentsSection: React.FC<Props> = ({ replies }) => {
  const renderComments = () => {
    return replies.map((commentData) => {
      return (
        <Grid style={{ flexGrow: 1 }} item key={commentData.id}>
          <Comment {...commentData} />
        </Grid>
      )
    })
  }

  return (
    <Box m={1}>
      <Grid container spacing={1}>
        {renderComments()}
      </Grid>
    </Box>
  )
}
