import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, Slide, useScrollTrigger } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

export class AppNav extends Component {
  render(): JSX.Element {
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
}
