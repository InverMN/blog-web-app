import React, { useState, useContext } from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
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
          <Typography style={{ flexGrow: 1 }} variant="h6">
            <b>Micro</b>blog
          </Typography>
          {user === null ? (
            <div>
              <Button variant="outlined" color="inherit" onClick={handleLoginOpen} style={{ marginRight: '14px' }}>
                Log in
              </Button>
              <Button variant="contained" disableElevation color="secondary" onClick={handleRegisterOpen}>
                Sign in
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
