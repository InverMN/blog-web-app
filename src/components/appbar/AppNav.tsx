import React, { useState, useContext } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { LoginDialog, RegisterDialog } from '../dialogs/index'
import { UserContext } from '../../contexts/index'
import { AccountMenu } from './index'

export const AppNav: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const { user } = useContext(UserContext)

  const handleLoginOpen = () => {
    setLoginOpen(true)
  }

  const handleLoginClose = () => {
    setLoginOpen(false)
  }

  const handleRegisterOpen = () => {
    setRegisterOpen(true)
  }

  const handleRegisterClose = () => {
    setRegisterOpen(false)
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Mikroblog</Typography>
          {user === null ? (
            <div>
              <Button color="inherit" onClick={handleLoginOpen}>
                Login
              </Button>
              <Button color="inherit" onClick={handleRegisterOpen}>
                Register
              </Button>
            </div>
          ) : (
            <div>
              <AccountMenu />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <LoginDialog onClose={handleLoginClose} open={loginOpen} />
      <RegisterDialog onClose={handleRegisterClose} open={registerOpen} />
    </div>
  )
}
