import React from 'react'
import { ListItem, ListItemText, Typography } from '@material-ui/core'

export const EmptyList: React.FC = () => (
  <ListItem style={{ fontWeight: 600, color: 'rgba(0, 0, 0, 0.40)', textAlign: 'center', height: 220 }}>
    <ListItemText>
      <Typography variant="h6">EMPTY</Typography>
    </ListItemText>
  </ListItem>
)
