import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

export const AppNav: React.FC = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Mikroblog</Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
