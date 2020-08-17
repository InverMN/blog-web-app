import React from 'react'
import { ListSubheader, Grid } from '@material-ui/core'

export const ReportsListTopBar: React.FC = () => {
  return (
    <ListSubheader style={{ backgroundColor: 'white' }}>
      <Grid container justify="space-between">
        <Grid item>Reports</Grid>
      </Grid>
    </ListSubheader>
  )
}
