import React, { useState, useContext } from 'react'
import { Popover, Box, Avatar, Typography, Grid, Paper } from '@material-ui/core'
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import { UserContext } from '../../contexts/index'
import { useAPI } from '../../lib/index'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  profileButton: {
    borderRadius: '100px',
    padding: '0 14px 0 10px',
    boxShadow: 'none',
  },
  changeAvatarButton: {
    width: '76px',
    height: '76px',
  },
  hiddenInput: {
    display: 'none',
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
      window.location = window.location
      api.post('avatars', formData)
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
              <Grid item>
                <form encType="multipart/form-data">
                  <label>
                    <Avatar
                      className={classes.changeAvatarButton}
                      alt={user?.username}
                      src={`http://localhost:5500/static/avatars/${user?.id}.png`}
                    />
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
                <ExitToAppIcon color="error" />
              </Grid>
              <Grid item>
                <Typography>Log out</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </div>
  )
}
