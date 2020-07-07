import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

export const Hangout: React.FC = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Grid container direction="column" spacing={6}></Grid>
      </Container>
    </div>
  )
}
