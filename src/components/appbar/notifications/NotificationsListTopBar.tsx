import React from 'react'
import { ListSubheader, Grid, Button } from '@material-ui/core'
import { ClearAll as ClearAllIcon } from '@material-ui/icons'

interface Props {
  clearAll: () => void
}

export const NotificationsListTopBar: React.FC<Props> = ({ clearAll }) => {
  return (
    <ListSubheader>
      <Grid container justify="space-between">
        <Grid item>Notifications</Grid>
        <Grid item>
          <Button onClick={clearAll} size="small" style={{ color: ' rgba(0, 0, 0, 0.54)' }} endIcon={<ClearAllIcon />}>
            clear all
          </Button>
        </Grid>
      </Grid>
    </ListSubheader>
  )
}
