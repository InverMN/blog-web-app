import React from 'react'
import { Box } from '@material-ui/core'
import { Comment } from './index'

export const CommentsSection: React.FC = () => {
  return <Box m={1}>{<Comment />}</Box>
}
