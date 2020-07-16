import React, { useState, useContext } from 'react'
import {
  Fab,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Add as AddIcon, Edit as EditIcon } from '@material-ui/icons'
import { TransitionProps } from '@material-ui/core/transitions'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useAPI } from '../../lib/index'
import { ForumContext } from '../../contexts/index'

const useStyles = makeStyles({
  floating: {
    position: 'fixed',
    bottom: '65px',
    right: '70px',
  },
  title: {
    flexGrow: 1,
  },
  fullSized: {
    height: '100%',
    width: '100%',
    maxWidth: '650px',
  },
  noPadding: {
    padding: '0',
  },
})

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const PostEditor: React.FC = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState('')
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const { dispatch } = useContext(ForumContext)
  const api = useAPI()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const publishPost = () => {
    setOpenBackdrop(true)
    api
      .post('posts', {
        title: 'title is unseseccary',
        body: body,
      })
      .then((res) => {
        dispatch({ type: 'ADD_POST', payload: res.data })
        setBody('')
        setOpen(false)
      })
      .finally(() => {
        setOpenBackdrop(false)
      })
  }

  return (
    <div>
      {api.isAuthenticated ? (
        <div>
          <Fab
            className={classes.floating}
            style={{ backgroundColor: body === '' ? '#d500f9' : '#4caf50' }}
            color="primary"
            aria-label="add post"
            onClick={handleOpen}
          >
            {body === '' ? <AddIcon /> : <EditIcon />}
          </Fab>
          <Dialog open={open} fullScreen TransitionComponent={Transition}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Create Post
                </Typography>
                <Button autoFocus disabled={body === ''} color="inherit" onClick={publishPost}>
                  publish
                </Button>
              </Toolbar>
            </AppBar>
            <Container maxWidth="sm" className={classes.noPadding}>
              <CKEditor
                className={classes.fullSized}
                editor={ClassicEditor}
                data={body}
                onChange={(event: undefined, editor: { getData: () => string }) => {
                  setBody(editor.getData())
                }}
              />
            </Container>
          </Dialog>
          <Backdrop style={{ zIndex: 1000000 }} open={openBackdrop}>
            <CircularProgress color="primary" />
          </Backdrop>
        </div>
      ) : null}
    </div>
  )
}
