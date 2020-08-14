import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core'
import { AuthenticationContext } from '../../contexts/AuthenticationContext'

export const MustBeLogged: React.FC = () => {
  const { open, setOpen } = React.useContext(AuthenticationContext)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Attempt to use only verified user feature</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To unlock many actions in this page you must be logged in. You can create new account on use existing one.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
