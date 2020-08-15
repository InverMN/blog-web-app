import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
  Container,
  Divider,
  Typography,
} from '@material-ui/core'
import { AuthenticationContext } from '../../contexts/AuthenticationContext'
import { LoginDialog, RegisterDialog } from './index'

export const MustBeLogged: React.FC = () => {
  const { open, setOpen } = React.useContext(AuthenticationContext)
  const [openLogin, setOpenLogin] = React.useState(false)
  const [openRegister, setOpenRegister] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpenLogin = () => {
    setOpenLogin(true)
    setOpen(false)
  }

  const handleCloseLogin = () => {
    setOpen(true)
    setOpenLogin(false)
  }

  const handleOpenRegister = () => {
    setOpenRegister(true)
    setOpen(false)
  }

  const handleCloseRegister = () => {
    setOpen(true)
    setOpenRegister(false)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle>Attempt to use only verified user feature</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To unlock many actions in this page you must be logged in. You can create new account or use existing one.
          </DialogContentText>
          <Container>
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid item>
                <Button variant="outlined" color="primary" size="large" onClick={handleOpenLogin}>
                  Log in
                </Button>
              </Grid>
              <Grid item container justify="center" alignItems="center">
                <Grid item>
                  <Divider style={{ width: '70px' }} />
                </Grid>
                <Grid item>
                  <Typography style={{ color: 'rgba(0, 0, 0, 0.35)', margin: '0px 5px' }}>OR</Typography>
                </Grid>
                <Grid item>
                  <Divider style={{ width: '70px' }} />
                </Grid>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" size="large" onClick={handleOpenRegister}>
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {openLogin && <LoginDialog open={openLogin} onClose={handleCloseLogin} />}
      {openRegister && <RegisterDialog open={openRegister} onClose={handleCloseRegister} />}
    </div>
  )
}
