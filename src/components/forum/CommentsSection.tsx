import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { Comment } from './index'
import { Comment as CommentData } from '../../contexts/index'

interface Props {
  replies: CommentData[]
  m?: number
}

export const CommentsSection: React.FC<Props> = ({ replies, m }) => {
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
    <Box m={m === undefined ? 1 : m}>
      <Grid container spacing={1}>
        {renderComments()}
      </Grid>
    </Box>
  )
}
