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
  Typography,
} from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { boolean } from 'yup'

export interface LoginDialogProps {
  open: boolean
  onClose: () => void
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(3).max(200),
})

export const LoginDialog: React.FC<LoginDialogProps> = (props: LoginDialogProps) => {
  const { open, onClose } = props
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down('xs'))
  const api = useAPI()
  const { user, setUser } = useContext(UserContext)

  const initialValues = {
    email: '',
    password: '',
  }

  const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string } = {}

    if (!values.email) errors.email = 'Required'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email address'

    return errors
  }

  const handleClose = () => {
    onClose()
  }

  const handleLogin = (
    values: { email: string; password: string },
    submit: { setSubmitting: (state: boolean) => void },
  ) => {
    const { email, password } = values
    const { setSubmitting } = submit

    api
      .login(email, password)
      .then((res) => {
        if (res.accessToken) onClose()
      })
      .catch((error) => {
        console.log('error:', error.response.data.error)
        setSubmitting(false)
      })
  }

  return (
    <div>
      <Dialog fullScreen={fullscreen} open={open}>
        <DialogTitle>Log in</DialogTitle>
        <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleLogin}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <div>
              <DialogContent>
                <form noValidate>
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
                  <Typography color="error">{errors.email && touched.email && errors.email}</Typography>
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
                  <Typography color="error"> {errors.password && touched.password && errors.password}</Typography>
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
      </Dialog>
    </div>
  )
}
