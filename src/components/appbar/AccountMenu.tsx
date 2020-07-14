import React, { useState, useContext } from 'react'
import { Popover, Box, Avatar, Typography, Grid, Paper } from '@material-ui/core'
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import { UserContext } from '../../contexts/index'
import { useAPI } from '../../lib/index'

export const AccountMenu: React.FC = () => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const { user, setUser } = useContext(UserContext)
  const api = useAPI()

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
  console.log(user)

  return (
    <div>
      <Paper onClick={handleClick}>
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
          <Grid container direction="row" justify="center" alignItems="center" onClick={logout}>
            <Grid item>
              <ExitToAppIcon color="error" />
            </Grid>
            <Grid item>
              <Typography>Log out</Typography>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </div>
  )
}
