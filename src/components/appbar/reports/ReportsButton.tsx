import React from 'react'
import { IconButton, Badge } from '@material-ui/core'
import { Error as ErrorIcon } from '@material-ui/icons'

export const ReportsButton: React.FC = () => {
  return (
    <IconButton>
      <Badge badgeContent={20} max={99} color="error">
        <ErrorIcon style={{ color: 'white' }} />
      </Badge>
    </IconButton>
  )
}
