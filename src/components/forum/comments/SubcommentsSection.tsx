import React, { useState } from 'react'
import { Box, Grid } from '@material-ui/core'
import { Subcomment, CommentEditor } from './index'
import { Subcomment as SubcommentData } from '../../../contexts/index'

interface Props {
  subcomments: SubcommentData[]
  target: string
  handleOpenEditor: () => void
  handleCloseEditor: () => void
  openEditor: boolean
}

export const SubcommentsSection: React.FC<Props> = ({
  subcomments,
  target,
  handleOpenEditor,
  handleCloseEditor,
  openEditor,
}) => {
  const renderSubcomments = () => {
    return subcomments.map((subcommentData) => {
      return (
        <Grid style={{ flexGrow: 1 }} item key={subcommentData.id}>
          <Subcomment handleOpenEditor={handleOpenEditor} subcomment={subcommentData} />
        </Grid>
      )
    })
  }

  return (
    <Box m={1}>
      <Grid container spacing={1}>
        {renderSubcomments()}

        {openEditor ? (
          <Grid item style={{ flexGrow: 1 }}>
            <CommentEditor handleClose={handleCloseEditor} target={target} />
          </Grid>
        ) : null}
      </Grid>
    </Box>
  )
}
