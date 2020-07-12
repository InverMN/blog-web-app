import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/index'
import { useAPI } from '../../lib/index'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  Button,
  TextField,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

export interface LoginDialogProps {
  open: boolean
  onClose: () => void
}

export const LoginDialog: React.FC<LoginDialogProps> = (props: LoginDialogProps) => {
  const { open, onClose } = props
  const [wait, setWait] = useState(false)
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down('xs'))
  const api = useAPI()
  const { user, setUser } = useContext(UserContext)

  const handleClose = () => {
    onClose()
  }

  const handleLogin = () => {
    setWait(true)
    api.login('jankowskipawelxd@gmail.com', 'qwaszx').then((res) => {
      if (setUser !== null) setUser(res.data)
      console.log('set up user:', user)
      setWait(false)
      onClose()
    })
  }

  return (
    <div>
      <Dialog fullScreen={fullscreen} open={open}>
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <form noValidate>
            <TextField fullWidth type="email" id="email" label="E-mail" variant="outlined"></TextField>
            <TextField fullWidth type="password" id="password" label="Password" variant="outlined"></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ float: 'left' }} color="primary" autoFocus>
            Close
          </Button>
          <Button disableElevation onClick={handleLogin} color="primary" variant="contained" autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop style={{ zIndex: 1000000 }} open={wait}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  )
}
