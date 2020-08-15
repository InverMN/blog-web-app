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

export const MustBeLogged: React.FC = () => {
  const { open, setOpen } = React.useContext(AuthenticationContext)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle>Attempt to use only verified user feature</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To unlock many actions in this page you must be logged in. You can create new account or use existing one.
        </DialogContentText>
        <Container>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
              <Button variant="outlined" color="primary" size="large">
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
              <Button variant="contained" color="secondary" size="large">
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
  )
}
