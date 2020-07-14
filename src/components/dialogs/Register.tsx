import React, { useContext } from 'react'
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

export interface RegisterDialogProps {
  open: boolean
  onClose: () => void
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6).max(200),
  retryPassword: Yup.string().required().min(6).max(200),
  username: Yup.string().required().min(2).max(16),
})

const useStyles = makeStyles({
  fullWide: {
    width: '100%',
  },
})

export const RegisterDialog: React.FC<RegisterDialogProps> = (props: RegisterDialogProps) => {
  const { open, onClose } = props
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down('xs'))
  const api = useAPI()
  const { user, setUser } = useContext(UserContext)
  const classes = useStyles()

  const initialValues = {
    email: '',
    password: '',
    retryPassword: '',
    username: '',
  }

  const handleClose = () => {
    onClose()
  }

  const handleRegister = (
    values: { email: string; password: string; retryPassword: string; username: string },
    submit: { setSubmitting: (state: boolean) => void; setErrors: any },
  ) => {
    const { email, password, retryPassword, username } = values
    const { setSubmitting, setErrors } = submit

    if (password !== retryPassword) {
      setErrors({ retryPassword: 'Passwords do not match' })
      setSubmitting(false)
      return
    }

    api
      .register(email, username, password)
      .then((res) => {
        if (res.accessToken) {
          onClose()
          console.log(api.isAuthenticated)
          api.get('users/me').then((res) => {
            if (setUser !== null) setUser(res.data)
          })
        }
      })
      .catch((error) => {
        const apiError: APIError = error.response.data.error
        console.log('registering error:', apiError)
        if (apiError?.source === 'email') setErrors({ email: 'This e-mail is already used' })
        else if (apiError?.source === 'username') setErrors({ username: 'This username is already used' })
        setSubmitting(false)
      })
  }

  return (
    <div>
      <Dialog fullScreen={fullscreen} open={open} maxWidth="xs" fullWidth={true}>
        <Grid container direction="column" justify="center" alignItems="center" style={{ height: '100%' }}>
          <Grid item>
            <DialogTitle>Sign in</DialogTitle>
          </Grid>
          <Grid item className={classes.fullWide}>
            <Formik initialValues={initialValues} validationSchema={RegisterSchema} onSubmit={handleRegister}>
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
                            name="username"
                            type="text"
                            id="username"
                            label="Username"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          <Typography color="error">
                            {errors.username && touched.username ? errors.username : '⠀'}
                          </Typography>
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
                        <Grid item className={classes.fullWide}>
                          <TextField
                            fullWidth
                            name="retryPassword"
                            type="password"
                            id="retryPassword"
                            label="Retry Password"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.retryPassword}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          <Typography color="error">
                            {errors.retryPassword && touched.retryPassword ? errors.retryPassword : '⠀'}
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
                      disabled={
                        !dirty ||
                        isSubmitting ||
                        Boolean(errors.email || errors.password || errors.username || errors.retryPassword)
                      }
                    >
                      Register
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
