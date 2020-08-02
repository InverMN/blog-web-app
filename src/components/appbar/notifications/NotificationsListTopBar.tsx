import React from 'react'
import { ListSubheader, Grid, Button } from '@material-ui/core'
import { ClearAll as ClearAllIcon } from '@material-ui/icons'

export const NotificationsListTopBar: React.FC = () => {
  return (
    <ListSubheader>
      <Grid container>
        <Grid item>Notifications</Grid>
        <Grid item>
          <Button size="small" style={{ color: ' rgba(0, 0, 0, 0.54)' }} endIcon={<ClearAllIcon />}>
            clear all
          </Button>
        </Grid>
      </Grid>
    </ListSubheader>
  )
}
