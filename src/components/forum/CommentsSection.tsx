import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { Comment, CommentEditor } from './index'
import { Comment as CommentData } from '../../contexts/index'

interface Props {
  replies: CommentData[]
  indent?: boolean
  showEditorTop?: boolean
  handleCloseTop?: () => void
  showEditorBottom?: boolean
  handleCloseBottom?: () => void
  author?: { id: string; username: string }
  target?: string
}

export const CommentsSection: React.FC<Props> = ({
  replies,
  indent,
  showEditorTop,
  handleCloseTop,
  showEditorBottom,
  handleCloseBottom,
  author,
  target,
}) => {
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
    <Box m={1} style={indent ? { marginLeft: '0', marginRight: '0' } : {}}>
      <Grid container spacing={1}>
        {showEditorTop && author && target && handleCloseTop ? (
          <Grid item style={{ flexGrow: 1 }}>
            <CommentEditor handleClose={handleCloseTop} author={author} target={target} />
          </Grid>
        ) : null}

        {renderComments()}
      </Grid>
    </Box>
  )
}
