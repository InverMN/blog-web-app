import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { Subcomment, CommentEditor } from './index'
import { Subcomment as SubcommentData } from '../../../contexts/index'

interface Props {
  subcomments: SubcommentData[]
  showEditor: boolean
  handleClose: () => void
  target: string
}

export const SubcommentsSection: React.FC<Props> = ({ subcomments, showEditor, handleClose, target }) => {
  const renderSubcomments = () => {
    return subcomments.map((subcommentData) => {
      return (
        <Grid style={{ flexGrow: 1 }} item key={subcommentData.id}>
          <Subcomment subcomment={subcommentData} />
        </Grid>
      )
    })
  }

  return (
    <Box m={1}>
      <Grid container spacing={1}>
        {showEditor ? (
          <Grid item style={{ flexGrow: 1 }}>
            <CommentEditor handleClose={handleClose} target={target} />
          </Grid>
        ) : null}

        {renderSubcomments()}
      </Grid>
    </Box>
  )
}
