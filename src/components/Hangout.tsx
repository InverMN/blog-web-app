import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { Post } from './index'

export const Hangout: React.FC = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Grid container direction="column" spacing={6}></Grid>
      </Container>
    </div>
  )
}
