import React, { useState, useContext } from 'react'
import { Popover, Box, Avatar, Typography, Grid, Paper, Button } from '@material-ui/core'
import { ExitToApp as ExitToAppIcon, CameraAlt as CameraAltIcon } from '@material-ui/icons'
import { UserContext } from '../../contexts/index'
import { useAPI } from '../../lib/index'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  profileButton: {
    borderRadius: '100px',
    padding: '0 14px 0 10px',
    boxShadow: 'none',
    cursor: 'pointer',
  },
  changeAvatarButton: {
    width: '76px',
    height: '76px',
    cursor: 'pointer',
  },
  hiddenInput: {
    display: 'none',
  },
  cameraIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '2em',
    cursor: 'pointer',
  },
})

export const AccountMenu: React.FC = () => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const { user, setUser } = useContext(UserContext)
  const api = useAPI()
  const classes = useStyles()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  const logout = () => {
    if (setUser !== null) {
      setUser(null)
      api.logout()
    }
  }

  const open = Boolean(anchorElement)
  const id = open ? 'account-popover' : undefined

  const selectedImage = (target: HTMLInputElement) => {
    if (target.files !== null && target.files[0] !== undefined) {
      const file = target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      api.post('avatars', formData)
      window.location = window.location
    }
  }

  return (
    <div>
      <Paper onClick={handleClick} className={classes.profileButton}>
        <Grid container spacing={1} direction="row" justify="center" alignItems="center">
          <Grid item>
            <Avatar alt={user?.username} src={`http://localhost:5500/static/avatars/${user?.id}.png`} />
          </Grid>
          <Grid item>
            <Typography>{user?.username}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorElement}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box m={2}>
          <Grid container>
            <Grid item container direction="row" justify="center" alignItems="center">
              <Grid item style={{ position: 'relative' }}>
                <form encType="multipart/form-data">
                  <label>
                    <Avatar
                      className={classes.changeAvatarButton}
                      alt={user?.username}
                      src={`http://localhost:5500/static/avatars/${user?.id}.png`}
                    />
                    <CameraAltIcon className={classes.cameraIcon} />
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      className={classes.hiddenInput}
                      onChange={(e) => selectedImage(e.target)}
                    />
                  </label>
                </form>
              </Grid>
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center" onClick={logout}>
              <Grid item>
                <Button startIcon={<ExitToAppIcon />}>Log out</Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </div>
  )
}
