import React from 'react'
import { Popover } from '@material-ui/core'

interface Props {
  anchorElement: HTMLElement | null
  handleClose: () => void
}

export const NotificationsList: React.FC<Props> = ({ anchorElement, handleClose }) => {
  return (
    <Popover
      open={Boolean(anchorElement)}
      anchorEl={anchorElement}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handleClose}
    ></Popover>
  )
}
