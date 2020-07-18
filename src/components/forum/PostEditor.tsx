import React, { useState, useContext, useEffect } from 'react'
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
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Send as SendIcon } from '@material-ui/icons'
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

const editorConfig = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    '|',
    'link',
    'imageUpload',
    'mediaEmbed',
    'blockQuote',
    '|',
    'numberedList',
    'bulletedList',
    '|',
    'undo',
    'redo',
  ],
}

export const PostEditor: React.FC = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState('')
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const { dispatch, forum } = useContext(ForumContext)
  const api = useAPI()

  useEffect(() => {
    if (forum.edited !== undefined && open === false) {
      setOpen(true)
      setBody(forum.edited.body)
    }
  }, [forum.edited])

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
        body: body,
      })
      .then((res) => {
        dispatch({ type: 'ADD_POST', payload: { ...res.data, userReaction: 'neutral' } })
        setBody('')
        setOpen(false)
      })
      .finally(() => {
        setOpenBackdrop(false)
      })
  }

  const editPost = () => {
    if (forum !== undefined) {
      api.patch(`posts/${forum.edited?.editedPostId}`, { body }).then()
      // @ts-ignore
      dispatch({ type: 'EDIT_POST', payload: { id: forum.edited.editedPostId, body } })
      dispatch({ type: 'EMPTY_EDITED' })
      setBody('')
      setOpen(false)
    }
  }

  const discardEditing = () => {
    setOpen(false)
    setBody('')
    dispatch({ type: 'EMPTY_EDITED' })
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
                  {forum.edited === undefined ? 'Create Post' : 'Edit Post'}
                </Typography>
                <Button disabled={body === ''} color="inherit" onClick={discardEditing} style={{ marginRight: '13px' }}>
                  <DeleteIcon color={body === '' ? 'action' : 'error'} />
                  Discard
                </Button>
                <Button
                  autoFocus
                  disabled={body === ''}
                  variant="contained"
                  color="secondary"
                  disableElevation
                  onClick={forum.edited === undefined ? publishPost : editPost}
                >
                  <SendIcon />
                  {forum.edited === undefined ? 'publish' : 'commit'}
                </Button>
              </Toolbar>
            </AppBar>
            <Container maxWidth="sm" className={classes.noPadding}>
              <CKEditor
                className={classes.fullSized}
                editor={ClassicEditor}
                data={body}
                config={editorConfig}
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
