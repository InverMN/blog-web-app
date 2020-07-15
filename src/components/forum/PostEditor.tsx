import React, { useState } from 'react'
import { Fab, Dialog, Slide, AppBar, Toolbar, IconButton, Typography, Button, Container, Grid } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Add as AddIcon } from '@material-ui/icons'
import { TransitionProps } from '@material-ui/core/transitions'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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
  const [body, setBody] = useState('<p>Type content of post here...</p>')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Fab className={classes.floating} color="primary" aria-label="add post" onClick={handleOpen}>
        <AddIcon />
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
            <Button autoFocus color="inherit" onClick={handleClose}>
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
    </div>
  )
}
