import React from 'react'
import { ListSubheader, Grid, Button } from '@material-ui/core'
import { ClearAll as ClearAllIcon } from '@material-ui/icons'

interface Props {
  clearAll: () => void
  isEmpty: boolean
}

export const NotificationsListTopBar: React.FC<Props> = ({ clearAll, isEmpty }) => {
  return (
    <ListSubheader style={{ backgroundColor: 'white' }}>
      <Grid container justify="space-between">
        <Grid item>Notifications</Grid>
        <Grid item>
          <Button
            onClick={clearAll}
            disabled={isEmpty}
            size="small"
            style={{ color: isEmpty ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.54)' }}
            endIcon={<ClearAllIcon />}
          >
            clear all
          </Button>
        </Grid>
      </Grid>
    </ListSubheader>
  )
}
