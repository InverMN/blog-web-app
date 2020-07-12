import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { LoginDialog } from './dialogs/index'

export const AppNav: React.FC = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Mikroblog</Typography>
          <Button color="inherit" onClick={handleOpen}>
            Login
          </Button>
          <Button color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
      <LoginDialog onClose={handleClose} open={open} />
    </div>
  )
}
