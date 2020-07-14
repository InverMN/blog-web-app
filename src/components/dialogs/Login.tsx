import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/index'
import { useAPI, APIError } from '../../lib/index'
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
  Typography,
  Grid,
} from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'

export interface LoginDialogProps {
  open: boolean
  onClose: () => void
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(3).max(200),
})

const useStyles = makeStyles({
  fullWide: {
    width: '100%',
  },
})

export const LoginDialog: React.FC<LoginDialogProps> = (props: LoginDialogProps) => {
  const { open, onClose } = props
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down('xs'))
  const api = useAPI()
  const { user, setUser } = useContext(UserContext)
  const classes = useStyles()

  const initialValues = {
    email: '',
    password: '',
  }

  const handleClose = () => {
    onClose()
  }

  const handleLogin = (
    values: { email: string; password: string },
    submit: { setSubmitting: (state: boolean) => void; setErrors: any },
  ) => {
    const { email, password } = values
    const { setSubmitting, setErrors } = submit

    api
      .login(email, password)
      .then((res) => {
        if (res.accessToken) {
          onClose()
          api.get('users/me').then((res) => {
            if (setUser !== null) setUser(res.data)
          })
        }
      })
      .catch((error) => {
        const apiError: APIError = error.response.data.error
        setErrors({ password: 'test' })
        if (apiError?.source === 'email') setErrors({ email: "There's no account registered to this e-mail" })
        else if (apiError?.source === 'password') setErrors({ password: 'Incorrect password' })
        setSubmitting(false)
      })
  }

  return (
    <div>
      <Dialog fullScreen={fullscreen} open={open} maxWidth="xs" fullWidth={true}>
        <Grid container direction="column" justify="center" alignItems="center" style={{ height: '100%' }}>
          <Grid item>
            <DialogTitle>Log in</DialogTitle>
          </Grid>
          <Grid item className={classes.fullWide}>
            <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleLogin}>
              {({ values, errors, touched, dirty, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <div>
                  <DialogContent>
                    <form noValidate>
                      <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item className={classes.fullWide}>
                          <TextField
                            fullWidth
                            name="email"
                            type="email"
                            id="email"
                            label="E-mail"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          <Typography color="error">{errors.email && touched.email ? errors.email : '⠀'}</Typography>
                        </Grid>
                        <Grid item className={classes.fullWide}>
                          <TextField
                            fullWidth
                            name="password"
                            type="password"
                            id="password"
                            label="Password"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          <Typography color="error">
                            {errors.password && touched.password ? errors.password : '⠀'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} style={{ float: 'left' }} color="primary" autoFocus>
                      Close
                    </Button>
                    <Button
                      disableElevation
                      onClick={() => {
                        handleSubmit()
                      }}
                      color="primary"
                      variant="contained"
                      autoFocus
                      disabled={!dirty || isSubmitting || Boolean(errors.email || errors.password)}
                    >
                      Login
                    </Button>
                  </DialogActions>
                  <Backdrop style={{ zIndex: 1000000 }} open={isSubmitting}>
                    <CircularProgress variant="indeterminate" color="primary" />
                  </Backdrop>
                </div>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  )
}
